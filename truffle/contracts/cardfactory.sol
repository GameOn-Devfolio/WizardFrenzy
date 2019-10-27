pragma solidity ^0.5.0;

import "./ownable.sol";
import "./safemath.sol";

contract CardFactory is Ownable {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;
    
    event NewCard (uint cardId, string name, uint tokenId, uint16 category, uint16 spell_1, uint16 spell_2, uint16 spell_3, uint16 spell_4, uint16 spell_5);
    uint tokenDigits = 16;
    uint tokenModulus = 10 ** tokenDigits;
    
    struct Card {
        string name;
        uint tokenId;
        uint16 category;
        uint16 spell_1;
        uint16 spell_2;
        uint16 spell_3;
        uint16 spell_4;
        uint16 spell_5;
    }
    
    Card[] public cards;
    // Mapping by index
    // mapping (uint => address) public cardOwner;
     // Mapping by index
    mapping (uint => uint) public cardIndex;
    mapping (address => uint) public ownerCardCount;
    mapping (address => uint) public ownerLevel;
    mapping (address => uint) public ownerWins;
    mapping (address => uint) public ownerLosses;
    mapping (address => uint) public ownerScore;
    //Mapping by tokenId
    mapping (uint => address) public cardOwnership;
    uint public roundsCounter = 0;
    bool oddEven = false;
    address payable deployer;
    
    function _createCard (string memory _name, uint _tokenId, uint16 _category, uint16 _spell_1, uint16 _spell_2, uint16 _spell_3, uint16 _spell_4, uint16 _spell_5) internal {
        uint indexId = cards.push(Card(_name, _tokenId, _category, _spell_1, _spell_2, _spell_3, _spell_4, _spell_5)) - 1;
        // cardOwner[indexId] = msg.sender;
        cardIndex[_tokenId] = indexId;
        cardOwnership[_tokenId] = msg.sender;
        ownerCardCount[msg.sender] = ownerCardCount[msg.sender].add(1);
        emit NewCard(indexId, _name, _tokenId, _category, _spell_1, _spell_2, _spell_3, _spell_4, _spell_5);
    }
    
    function _generateRandomToken (string memory _str, uint _category) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str, now, _category)));
        return rand % tokenModulus;
    }
    
    function createRandomCard (string memory _name, uint16 _category) public {
        uint randToken = _generateRandomToken(_name, _category);
        randToken = randToken - randToken % 100;
        if (oddEven == true) {
            _createCard(_name, randToken, _category, 5, 10, 10, 5, 10);
            oddEven = false;
        }
        else {
             _createCard(_name, randToken, _category, 10, 5, 5, 10, 5);
             oddEven = true;
        }
    }
    function upgradeCard (uint _tokenId) payable public {
        require(msg.sender == cardOwnership[_tokenId], "Only Card owner can upgrade!");
        address player = msg.sender;
        // address payable ownerContract = address(_owner); 
        require(player.balance > 10 ether, "Player funds not sufficient!");
        uint indexTemp = cardIndex[_tokenId];
        if (oddEven == true) {
            if ((cards[indexTemp].spell_1 + 3) > 100) {
                cards[indexTemp].spell_1 = 100;
            }
            else {
                cards[indexTemp].spell_1 += 3;
            }
            if ((cards[indexTemp].spell_2 + 2) > 100) {
                cards[indexTemp].spell_2 = 100;
            }
            else {
                cards[indexTemp].spell_2 += 2;
            }
            if ((cards[indexTemp].spell_5 + 4) > 100) {
                cards[indexTemp].spell_5 = 100;
            }
            else {
                cards[indexTemp].spell_5 += 4;
            }
            oddEven = false;
        }
        else {
            if ((cards[indexTemp].spell_2 + 3) > 100) {
                cards[indexTemp].spell_2 = 100;
            }
            else {
                cards[indexTemp].spell_2 += 3;
            }
            if ((cards[indexTemp].spell_3 + 2) > 100) {
                cards[indexTemp].spell_3 = 100;
            }
            else {
                cards[indexTemp].spell_3 += 2;
            }
            if ((cards[indexTemp].spell_4 + 4) > 100) {
                cards[indexTemp].spell_4 = 100;
            }
            else {
                cards[indexTemp].spell_4 += 4;
            }
            oddEven = true;
            // Transfer of Matic tokens to be handle in Dapp
            // ownerContract.transfer(10 ether);
        }
    }
    
    function marketplaceCards () public {
        require(msg.sender == _owner, "Only Deployer can call this function!");
        deployer = msg.sender;
        createRandomCard ("Neville", 1);
        createRandomCard ("Luna", 1);
        createRandomCard ("George", 1);
        createRandomCard ("Fred", 1);
        createRandomCard ("Cho", 1);
        createRandomCard ("Harry", 2);
        createRandomCard ("Ron", 2);
        createRandomCard ("Hermione", 2);
        createRandomCard ("Draco", 2);
        createRandomCard ("Severus", 3);
        createRandomCard ("McGonagall", 3);
        createRandomCard ("Sirius", 3);
        createRandomCard ("Moody", 3);
        createRandomCard ("Lupin", 3);
        createRandomCard ("Albus", 4);
        createRandomCard ("Grindelwald", 4);
        createRandomCard ("Voldemort", 4);
    }
    
    // function checkUpgrade (uint _indexId, uint _spell, uint _upgradeCount) internal {
    //     uint newSpell = cards[_indexId]._spell + _upgradeCount;
    //     if (newSpell > 100) {
    //         cards[_indexId]._spell = 100;
    //     }
    //     else {
    //         cards[_indexId].._spell = newSpell;
    //     }
    // }
}
