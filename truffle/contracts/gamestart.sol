pragma solidity ^0.5.0;

import "./cardownership.sol";

contract GameStart is Ownership {
    
    mapping (uint256 => address) players;
    // bool public player1Flag = false;
    // bool public player2Flag = false;
    bool public gameStatus = false;
    uint public playerCount = 0;
    mapping (address => uint256) gambledCard;
    mapping (address => bool) playerStatus;
    mapping (uint256 => address) totalPlayers;
    
    mapping (address => bool) playerFlag;
    
    function playerRegister (address _player) public {
        require(playerStatus[_player] == false, "Player already registered!");
        // totalPlayers.push(_player);
        // Assign 5 cards to new player
        createRandomCard ("Neville", 1);
        createRandomCard ("George", 1);
        createRandomCard ("Luna", 1);
        createRandomCard ("Ron", 2);
        createRandomCard ("Lupin", 3);
        // Credit 50 WFTs to new player
        // transfer(msg.sender, 50);
        playerStatus[_player] = true;
    }
    
    // passing indexId of card being gambled, give contract address approval to transfer card to winner
    // both players need to call gameStart() individually
    function gameStart (address _player, uint256 _tokenId) public {
        require(playerFlag[_player] != true, "Player already in game!");
        playerFlag[_player] = true;
        players[playerCount] = _player;
        playerCount = playerCount.add(1);
        gambledCard[_player] = _tokenId;
        // Approve contract address to transfer Card to winner
        approve(address(this), _tokenId);
        transferFrom(_player, address(this), _tokenId);
        if (playerCount == 2) {
            gameStatus = true;
        }
    }
    
    function gameOver (address _winner, address _loser) public payable {
        require (gameStatus == true, "Game is not live, cannot end game!!");
        playerCount = 0;
        gameStatus = false;
        playerFlag[_winner] = false;
        playerFlag[_loser] = false;
        uint256 winnerToken = gambledCard[_winner];
        uint256 loserToken = gambledCard[_loser];
        // address contractAddress = address(this);
        // Loser's card goes to winner from contract address
        transferFrom(address(this), _winner, loserToken);
        // Winner's card returns to winner from contract address
        transferFrom(address(this), _winner, winnerToken);
    }
}
