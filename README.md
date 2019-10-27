# WizardFrenzy

[Live Link](https://fishingfrenzy-rinkeby.netlify.com/)

To view in Matic explorer:
Deployed Contract Address: 0x70Bb0D7FAdAB5ecdc2A636462200eC71e47331b4

[Matic Explorer Link](https://explorer.testnet2.matic.network/address/0x70bb0d7fadab5ecdc2a636462200ec71e47331b4/transactions)


[Video Demo](https://youtu.be/SnMnXaY3r0M)


WizardFrenzy is a multiplayer game, built as a decentralized application on the Ethereum blockchain.
Players can log in using their Ethereum account, and will receive 5 Wizards (ERC-721 NFTs). Players can upgrade the Wizard's spells by paying Ether, or they can buy new Wizards from the Marketplace using Ether.

Players can battle with other players by choosing one Wizard. The player has to choose which spell to battle with, and the winner of the battle will receive the loser's Wizard (NFT), score on the leaderboard, and bragging rights!

## Requirements

- Ubuntu
- Build-essential packages
- [Node.js](https://nodejs.org/) Version 10.15.3
- Angular 8
- [Truffle](https://www.trufflesuite.com/docs/truffle/overview)
- [Geth](https://www.trufflesuite.com/docs/truffle/overview)
- MetaMask Enabled Browser

## Setting Up:

**Step 1:** Download the repostory using the command:

```
 git clone "https://github.com/GameOn-Devfolio/WizardFrenzy.git"
 cd WizardFrenzy
```

**Step 2:** Install the dependecies using the command:

```
 npm Install
```
**Step 3:** Use the following command to run Smart Contract (follow one of the below, and then move to Step 4):

**Run On Matic **
```
truffle migrate --network matic --reset

```
**Run On Ganache **
```
ganache-cli

truffle migrate --reset
```
