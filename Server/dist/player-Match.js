"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var THAT;
var PlayerMatch = /** @class */ (function () {
    function PlayerMatch() {
        this.roomid = 0;
        this.game = {};
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    PlayerMatch.prototype.createApp = function () {
        this.app = express();
    };
    PlayerMatch.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    PlayerMatch.prototype.config = function () {
        this.port = 3010;
    };
    PlayerMatch.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    PlayerMatch.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
            socket.on('NewGame', function () {
                _this.roomid++;
                var roomID = 'R' + _this.roomid;
                console.log('Creating New Game: ', roomID);
                socket.join(roomID);
                _this.game[roomID] = {};
                _this.game[roomID].Player1 = socket.id;
                _this.game[roomID].Player1Char = 1;
                _this.game[roomID].Player1Spell = 1;
                socket.emit('CreatedGame', roomID);
            });
            socket.on('JoinGame', function (roomid) {
                var numClients = _this.io.sockets.adapter.rooms[roomid];
                if (numClients === undefined) {
                    socket.emit('JoinError', 'Invalid Room ID');
                }
                else if (numClients.length == 1) {
                    _this.game[roomid].Player2 = socket.id;
                    _this.game[roomid].Player2Char = 1;
                    _this.game[roomid].Player2Spell = 1;
                    socket.join(roomid);
                    socket.emit('JoinedGame', roomid);
                    //socket.broadcast.to(roomid).emit('startGame');
                    _this.io.to(roomid).emit('startGame', roomid);
                    console.log('Game Started');
                    _this.StartGame(roomid);
                }
                else {
                    socket.emit('JoinError', 'Room Already Filled');
                }
            });
            socket.on('SelectWizard', function () {
                console.log('Select Wizard');
            });
            socket.on('SelectSpell', function (data) {
                var room = data[0];
                var spell = data[1];
                if (_this.game[room].Player1 == socket.id) {
                    _this.game[room].Player1Spell = spell;
                }
                else {
                    _this.game[room].Player2Spell = spell;
                }
                console.log('Select Wizard');
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    PlayerMatch.prototype.StartGame = function (roomid) {
        THAT = this;
        var RoomId = roomid;
        setTimeout(function () {
            THAT.io.to(RoomId).emit('EndCharacterSelection');
            // //, [
            // THAT.game[roomid].Player1Char,
            //   THAT.game[roomid].Player2Char
            //   ]
            setTimeout(function () {
                console.log('here');
                var winner = Math.round(Math.random());
                if (winner == 0) {
                    THAT.io
                        .to(THAT.game[roomid].Player1)
                        .emit('MatchResult', [0, THAT.game[RoomId].Player1Spell]);
                    THAT.io
                        .to(THAT.game[roomid].Player2)
                        .emit('MatchResult', [1, THAT.game[RoomId].Player1Spell]);
                }
                else {
                    THAT.io
                        .to(THAT.game[roomid].Player1)
                        .emit('MatchResult', [1, THAT.game[RoomId].Player2Spell]);
                    THAT.io
                        .to(THAT.game[roomid].Player2)
                        .emit('MatchResult', [0, THAT.game[RoomId].Player2Spell]);
                }
            }, 10000);
        }, 13000);
    };
    PlayerMatch.prototype.getApp = function () {
        return this.app;
    };
    return PlayerMatch;
}());
exports.PlayerMatch = PlayerMatch;
