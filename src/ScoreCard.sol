//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ScoreCard {
    enum Combination {
        Pair,
        TwoPairs,
        ThreeOfAKind,
        Straight,
        FullHouse,
        FourOfAKind,
        FiveOfAKind
    }
    mapping(Combination => uint) public scores;

    constructor() {
        scores[Combination.Pair] = 5;
        scores[Combination.TwoPairs] = 10;
        scores[Combination.ThreeOfAKind] = 15;
        scores[Combination.Straight] = 20;
        scores[Combination.FullHouse] = 30;
        scores[Combination.FourOfAKind] = 40;
        scores[Combination.FiveOfAKind] = 50;
    }

    function getScore(uint8[] memory numbers) public view returns (uint) {
        require(numbers.length == 5, "You must roll exactly 5 dice");

        // Sort the numbers array for easier combination checking
        uint8[] memory sortedNumbers = sortNumbers(numbers);

        if (isFiveOfAKind(sortedNumbers)) {
            return scores[Combination.FiveOfAKind];
        } else if (isFourOfAKind(sortedNumbers)) {
            return scores[Combination.FourOfAKind];
        } else if (isFullHouse(sortedNumbers)) {
            return scores[Combination.FullHouse];
        } else if (isStraight(sortedNumbers)) {
            return scores[Combination.Straight];
        } else if (isThreeOfAKind(sortedNumbers)) {
            return scores[Combination.ThreeOfAKind];
        } else if (isTwoPairs(sortedNumbers)) {
            return scores[Combination.TwoPairs];
        } else if (isPair(sortedNumbers)) {
            return scores[Combination.Pair];
        } else {
            return scores[Combination.Straight];
        }
    }

    function sortNumbers(
        uint8[] memory numbers
    ) private pure returns (uint8[] memory) {
        uint8[] memory sortedNumbers = numbers;
        for (uint i = 0; i < sortedNumbers.length; i++) {
            for (uint j = i + 1; j < sortedNumbers.length; j++) {
                if (sortedNumbers[i] > sortedNumbers[j]) {
                    uint8 temp = sortedNumbers[i];
                    sortedNumbers[i] = sortedNumbers[j];
                    sortedNumbers[j] = temp;
                }
            }
        }
        return sortedNumbers;
    }

    function isFiveOfAKind(
        uint8[] memory sortedNumbers
    ) private pure returns (bool) {
        return sortedNumbers[0] == sortedNumbers[4];
    }

    function isFourOfAKind(
        uint8[] memory sortedNumbers
    ) private pure returns (bool) {
        return ((sortedNumbers[0] == sortedNumbers[3]) ||
            (sortedNumbers[1] == sortedNumbers[4]));
    }

    function isFullHouse(
        uint8[] memory sortedNumbers
    ) private pure returns (bool) {
        return ((sortedNumbers[0] == sortedNumbers[1] &&
            sortedNumbers[2] == sortedNumbers[4]) ||
            (sortedNumbers[0] == sortedNumbers[2] &&
                sortedNumbers[3] == sortedNumbers[4]));
    }

    function isStraight(
        uint8[] memory sortedNumbers
    ) private pure returns (bool) {
        return ((sortedNumbers[0] + 1 == sortedNumbers[1] &&
            sortedNumbers[1] + 1 == sortedNumbers[2] &&
            sortedNumbers[2] + 1 == sortedNumbers[3] &&
            sortedNumbers[3] + 1 == sortedNumbers[4]) ||
            (sortedNumbers[0] == 1 &&
                sortedNumbers[1] == 2 &&
                sortedNumbers[2] == 3 &&
                sortedNumbers[3] == 4 &&
                sortedNumbers[4] == 5));
    }

    function isThreeOfAKind(
        uint8[] memory sortedNumbers
    ) private pure returns (bool) {
        return ((sortedNumbers[0] == sortedNumbers[2]) ||
            (sortedNumbers[1] == sortedNumbers[3]) ||
            (sortedNumbers[2] == sortedNumbers[4]));
    }

    function isTwoPairs(
        uint8[] memory sortedNumbers
    ) private pure returns (bool) {
        return ((sortedNumbers[0] == sortedNumbers[1] &&
            sortedNumbers[2] == sortedNumbers[3]) ||
            (sortedNumbers[0] == sortedNumbers[1] &&
                sortedNumbers[3] == sortedNumbers[4]) ||
            (sortedNumbers[1] == sortedNumbers[2] &&
                sortedNumbers[3] == sortedNumbers[4]));
    }

    function isPair(uint8[] memory sortedNumbers) private pure returns (bool) {
        return ((sortedNumbers[0] == sortedNumbers[1]) ||
            (sortedNumbers[1] == sortedNumbers[2]) ||
            (sortedNumbers[2] == sortedNumbers[3]) ||
            (sortedNumbers[3] == sortedNumbers[4]));
    }
}
