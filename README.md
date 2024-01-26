# Sakuni-Sabha
A dice poker game set against a war backdrop.

## Tokens
  1. **Plutons** - 10
  2. **Auroras** - 5
  3. **Nexos** - 3

## Assets 

  ### Manuevers
  1. **Fortress** - 25,000
  2. **Castle** - 20,000
  3. **Stronghold** - 10,000
  4. **Bastion** - 7,500

  ### Conquest 
  1. **Imperial Apex** - 100,000
  2. **Citadel** - 75,000
  3. **Grandeur** - 50,000

## Modes 
There are two modes to play this game:
1. **Expedition**
2. **Siege**

### Expedition Mode:
  In this mode, a host creates a game, sets the total number of rounds (up to 5 max), and the bet for that game. Interested players join the game using the game code or from the explore. Players then place their bets, and the host starts the game by rolling dice. After each round, players can raise the bet as like in poker, but the rise value cannot be more than the . After five rounds, the player with the highest score wins the board, and the game concludes.

### Siege Mode:
  This is a multilevel version of Expedition mode, consisting of three levels:
  1. Bootcamp
  2. Maneuver
  3. Conquest

Bootcamp has 3 rounds, Maneuver has 2 rounds, and the final Conquest has only 1 round.

After Bootcamp, the winner gets 25% of the total bet and moves to Maneuver. In this level, players can bet assets. If anyone can't afford, they have to drop at the beginning. If all players drop, the player with the highest score wins the board, and the game is over. After the Manuver level, the winners get 50% of the total bet and then move to Conquest. In this level, players can bet more expensive assets like Citadel, Grandeur, and Imperial Apex. For Maneuver, the player must have a Maneuver Asset, and for Conquest, the player must have a Conquest Asset. A player can buy an asset during the game as well.

## Poker Hand Values

This table outlines the values assigned to different poker hands and additional bonuses within the game. Use this reference to understand the scoring system and strategize your way to victory in the eternal war.

## Dice Combinations Table

| Poker Hands               | Example                                          | Points |
|---------------------------|--------------------------------------------------|--------|
| Pair                      | Two 5s, Two 4s                                  | 5      |
| Two Pairs                 | Two 2s + Two 5s                                | 10     |
| Three of a Kind           | Three 6s, Three 8s, Three 4s                   | 15     |
| Straight                  | 1-2-3-4-5 (low Order sequence)                 | 20     |
| Royal Flush               | A-K-Q-J-10 of the same suit                    | 25     |
| Full House                | Three 2s + Two 3s, Three 4s + Two 4s           | 30     |
| Four of a Kind            | Four 5s                                          | 40     |
| Five of a Kind            | Five 6s, Five 2s                                 | 50     |
| Steal one die (Conquest)  | All of a kind (activated at the advanced level)| --     |
| Lock values of a dice (Conquest) | All Null                                  | --     |
| Retreat(get an extra reroll) | Any straight (Activated at the advanced level)| --    |
| Bust dice (Maneuver and Conquest) | Get a replacement die from the house for tokens | --  |

## How to Use

- **Example:** For a Pair of 4s, refer to the "Pair" row and find the corresponding example and points.

## Smart Contracts

**Requirements**
1. Chainlink Automation
2. Random Numbers (VRF)
3. Wallet Integration

## Expedition-contract Functions

### 1. `Create-Game`

#### Arguments

- `numOfRounds`: uint8 
- `minBetValue`: uint256
- `maxRiseValue`: uint8
- `numOfPlayers`: uint8

### 2. `Enter-Game`
### 3. `Roll-Dice`
### 4. `saveSelectedDice`
### 5. `rerollSelecedDice`
### 6. `getScoreCard`
### 7. `endGame`
### 7. `declareWinnerSendReward`
### 8. `getTheGameCode`
### 9. `getCurrentPlayerDiceCombos`
### 10. ``

## Seige-mode-contract Functions

### 1. `Create-Game`

#### Args
- `bootcampBetValue`: uint32
- `ManuverBetValue`: uint32
- `conquestBetValue`: uint32
- `numOfPlayer`: uint8

### 2. `Enter-Game`
### 8. `startLevelWithBets`
### 3. `Roll-Dice`
### 4. `saveSelectedDice`
### 5. `rerollSelecedDice`
### 6. `getScoreCard`
### 7. `declareLevelWinnerSendReward`
### 9. `ExitGame`