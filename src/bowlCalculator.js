'use strict';

var STRIKE = 'X',
    SPARE = '/',
    MAX_ROLL_SCORE = 10,
    FINAL_TURN = 10,

    //These variables represent the state of the game
    turn,
    turnRoll,

    /**
     * Initialize the state of the game
     */
    initializeGameState = function () {
        turn = 1;
        turnRoll = 1;
    },

    /**
     * Set game state for the next turn
     */
    nextTurn = function () {
        ++turn;
        turnRoll = 1;
    },

    /**
     * Set state for the next roll in the turn
     */
    nextTurnRoll = function () {
        ++turnRoll;
    },

    /**
     * Return true if on first turn roll
     * @return {Boolean}
     */
    firstTurnRoll = function () {
        return turnRoll === 1
    },

    /**
     * Calculate the total score for the game. This function
     * is supplied to array.reduce
     */
    calculate = function (total, rollResult, i, rolls) {
        var rollScore = 0;

        if (rollResult === STRIKE) {
            rollScore = MAX_ROLL_SCORE;

            if (turn !== FINAL_TURN) {
                rollScore += calculateBonus(rolls[i+1], rolls[i+2]);
                nextTurn();
            }            
        } else if (rollResult === SPARE) {
            rollScore = MAX_ROLL_SCORE - rolls[i-1];
            if (turn !== FINAL_TURN) {
                rollScore += calculateBonus(rolls[i+1], 0);
                nextTurn();
            }
        } else {
            rollScore = parseInt(rollResult);
            if (firstTurnRoll()) {
                nextTurnRoll();
            } else {
                nextTurn();
            }
        }

        return parseInt(total) + rollScore;
    },

    /**
     * Calculate the bonus for the turn. The rules
     * determining this logic can be found here:
     * https://en.wikipedia.org/wiki/Ten-pin_bowling#Scoring
     */
    calculateBonus = function (next1, next2) {
        next1 = next1 === STRIKE ? MAX_ROLL_SCORE : parseInt(next1);
        if (next2 === STRIKE) {
            next2 = MAX_ROLL_SCORE;
        } else if (next2 === SPARE) {
            next2 = MAX_ROLL_SCORE - next1;
        } else {
            next2 = parseInt(next2)
        };

        return next1 + next2;
    }

exports.getScore = function(arg) {
    var rolls = arg.split('');

    initializeGameState();

    return rolls.reduce(calculate, 0);
}
