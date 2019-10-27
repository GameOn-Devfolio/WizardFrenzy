# WizardFrenzy

### Contract steps

Deploy gamestart.sol

Execute function playerRegister() first for player1 (address1 in Remix). Creates 5 random cards for player1.
Execute function playerRegister() for player2 (address2 in Remix). Creates 5 random cards for player2.

Check card details of any card from 0 - 4 for player1 cards using getter function cards() (choose one tokenId to gamble).

Check card details of any card from 5 - 9 for player2 cards using getter function cards() (choose one tokenId to gamble).

Execute function gameStart() for player1 address with selected Card.

Execute function gameStart() for player2 address with selected Card.

Both gambled tokens move to Contract Address while game is live.

Execute function gameOver() with winner & loser addresses to end the game, and send cards to winner.
