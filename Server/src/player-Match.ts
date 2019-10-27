import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
var THAT: any;
export class PlayerMatch {
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;
  private roomid: number = 0;
  private game: { [k: string]: { [k: string]: any } } = {};

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = 3010;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on('connect', (socket: any) => {
      console.log('Connected client on port %s.', this.port);
      socket.on('NewGame', () => {
        this.roomid++;
        var roomID = 'R' + this.roomid;
        console.log('Creating New Game: ', roomID);
        socket.join(roomID);
        this.game[roomID] = {};
        this.game[roomID].Player1 = socket.id;
        this.game[roomID].Player1Char = 1;
        this.game[roomID].Player1Spell = 1;
        socket.emit('CreatedGame', roomID);
      });
      socket.on('JoinGame', (roomid: any) => {
        let numClients = this.io.sockets.adapter.rooms[roomid];
        if (numClients === undefined) {
          socket.emit('JoinError', 'Invalid Room ID');
        } else if (numClients.length == 1) {
          this.game[roomid].Player2 = socket.id;
          this.game[roomid].Player2Char = 1;
          this.game[roomid].Player2Spell = 1;
          socket.join(roomid);
          socket.emit('JoinedGame', roomid);
          //socket.broadcast.to(roomid).emit('startGame');
          this.io.to(roomid).emit('startGame', roomid);
          console.log('Game Started');
          this.StartGame(roomid);
        } else {
          socket.emit('JoinError', 'Room Already Filled');
        }
      });
      socket.on('SelectWizard', () => {
        console.log('Select Wizard');
      });
      socket.on('SelectSpell', (data: any) => {
        var room = data[0];
        var spell = data[1];
        if (this.game[room].Player1 == socket.id) {
          this.game[room].Player1Spell = spell;
        } else {
          this.game[room].Player2Spell = spell;
        }
        console.log('Select Wizard');
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  public StartGame(roomid: any) {
    THAT = this;
    var RoomId = roomid;
    setTimeout(function() {
      THAT.io.to(RoomId).emit('EndCharacterSelection');
      // //, [
      // THAT.game[roomid].Player1Char,
      //   THAT.game[roomid].Player2Char
      //   ]
      setTimeout(function() {
        console.log('here');

        var winner = Math.round(Math.random());
        if (winner == 0) {
          THAT.io
            .to(THAT.game[roomid].Player1)
            .emit('MatchResult', [0, THAT.game[RoomId].Player1Spell]);
          THAT.io
            .to(THAT.game[roomid].Player2)
            .emit('MatchResult', [1, THAT.game[RoomId].Player1Spell]);
        } else {
          THAT.io
            .to(THAT.game[roomid].Player1)
            .emit('MatchResult', [1, THAT.game[RoomId].Player2Spell]);
          THAT.io
            .to(THAT.game[roomid].Player2)
            .emit('MatchResult', [0, THAT.game[RoomId].Player2Spell]);
        }
      }, 10000);
    }, 13000);
  }

  public getApp(): express.Application {
    return this.app;
  }
}
