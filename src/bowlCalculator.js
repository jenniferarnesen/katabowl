'use strict';

var STRIKE = 'X',
    SPARE = '/',
    MISS = '-',
    MAX_ROLL_SCORE = 10,
    FINAL_FRAME = 9, //10 frames, but 0-based index

    /**
     * Calculate the score for the bowling game. This function is
     * passed to array.reduce
     */
    calculateScore = function (total, rollResult, i, rolls) {
        var rollScore = 0,
            finalFrame = isFinalFrame(i, rolls),
            rollScore = getBaseRollScore(rollResult, rolls[i-1]);

        if (!finalFrame) {
            if (rollResult === STRIKE) {
                rollScore += calculateBonus(rolls[i+1], rolls[i+2]);
            } else if (rollResult === SPARE) {
                rollScore += calculateBonus(rolls[i+1]);
            }
        }

        return parseInt(total) + rollScore;
    },

    /**
     * Gets the numeric value for the roll. In the case
     * of a spare, the roll score is 10 - previous roll
     */
    getBaseRollScore = function (roll, prev) {
        var scores = {
            'X': MAX_ROLL_SCORE,
            '/': MAX_ROLL_SCORE - parseInt(prev),
            '-': 0
        };

        return (scores[roll] !== undefined) ? scores[roll] : parseInt(roll);
    },

    /**
     * Calculate the bonus for the frame. The bonus is calculated
     * from the next 1 or 2 rolls of the game, depending on whether
     * a strike or spare was thrown.
     */
    calculateBonus = function (next1, next2) {
        next1 = getBaseRollScore(next1);
        next2 = next2 !== undefined ? getBaseRollScore(next2, next1) : 0;

        return next1 + next2;
    },

    /**
     * Return true if roll index is in the final frame
     */
    isFinalFrame = function (i, rolls) {
        var currentFrame = 0,
            frameRoll = 1,

            lastFrameRoll = function (roll) {
                return roll === STRIKE || roll === SPARE || frameRoll === 2;
            },

            nextFrame = function () {
                currentFrame += 1;
                frameRoll = 1;
            },

            nextFrameRoll = function () {
                frameRoll += 1;
            };

        for (var ri = 0; ri <= i; ri += 1) {
            if (ri === i || currentFrame === FINAL_FRAME) {
                break;
            }
            if (lastFrameRoll(rolls[ri])) {
                nextFrame();
            } else {
                nextFrameRoll();
            }
        }

        return currentFrame === FINAL_FRAME;
    };

exports.getScore = function(arg) {
    var rolls = arg.split('');

    return rolls.reduce(calculateScore, 0);
}
