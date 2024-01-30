// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import { ScoreCard } from "../../src/ScoreCard.sol";
import {Test} from "forge-std/Test.sol";

contract ScoreCardTest is Test{
  ScoreCard scoreCard;

  function setUp() public {
    scoreCard = new ScoreCard();
  }

  function testGetScore() public view{
    uint8[] memory numbers = new uint8[](5);
    numbers[0] = 1;
    numbers[1] = 2;
    numbers[2] = 0;
    numbers[3] = 1;
    numbers[4] = 1;

    uint score = scoreCard.getScore(numbers);
    assert(score == 15);
  }
}