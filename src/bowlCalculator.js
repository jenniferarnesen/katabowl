'use strict';

var STRIKE = 'X',
    SPARE = '/',
    MISS = '-',
    MAX_ROLL_SCORE = 10,
    FINAL_FRAME = 10,

    //These variables represent the state of the game
    frame,
    frameRoll,

    /**
     * Initialize the state of the game
     */
    initializeGameState = function () {
        frame = 1;
        frameRoll = 1;
    },

    /**
     * Set game state for the next frame
     */
    nextFrame = function () {
        frame += 1;
        frameRoll = 1;
    },

    /**
     * Set state for the next roll in the frame
     */
    nextFrameRoll = function () {
        frameRoll += 1;
    },

    /**
     * Return true if on first frame roll
     * @return {Boolean}
     */
    isFirstFrameRoll = function () {
        return frameRoll === 1
    },

    /**
     * Returns true if on the final (10th) frame
     * @return {Boolean}
     */
    isFinalFrame = function () {
        return frame === FINAL_FRAME;
    },

    /**
     * Calculate the total score for the game. When a spare or strike is
     * rolled, then a bonus is added to the score, unless the player is
     * on the final frame.
     *
     * This function is supplied to array.reduce
     */
    calculateScore = function (total, rollResult, i, rolls) {
        var rollScore = 0;

        if (rollResult === STRIKE) {
            rollScore = MAX_ROLL_SCORE;
            if (!isFinalFrame()) {
                rollScore += calculateBonus(rolls[i+1], rolls[i+2]);
                nextFrame();
            }            
        } else if (rollResult === SPARE) {
            rollScore = MAX_ROLL_SCORE - parseInt(rolls[i-1]);
            if (!isFinalFrame()) {
                rollScore += calculateBonus(rolls[i+1], 0);
                nextFrame();
            }
        } else {
            rollScore = rollResult === MISS ? 0 : parseInt(rollResult);
            if (isFirstFrameRoll()) {
                nextFrameRoll();
            } else {
                nextFrame();
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

    return rolls.reduce(calculateScore, 0);
}
