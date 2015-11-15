'use strict';

var STRIKE = 'X',
    SPARE = '/',
    MISS = '-',
    MAX_ROLL_SCORE = 10,
    FINAL_FRAME = 10,

    /**
     * Calculate the bonus for the frame. The rules
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
    },

    getReducer = function (gameState) {
        return function (total, rollResult, i, rolls) {
            var rollScore = 0;

            if (rollResult === STRIKE) {
                rollScore = MAX_ROLL_SCORE;
                if (!gameState.isFinalFrame()) {
                    rollScore += calculateBonus(rolls[i+1], rolls[i+2]);
                    gameState.nextFrame();
                }
            } else if (rollResult === SPARE) {
                rollScore = MAX_ROLL_SCORE - parseInt(rolls[i-1]);
                if (!gameState.isFinalFrame()) {
                    rollScore += calculateBonus(rolls[i+1], 0);
                    gameState.nextFrame();
                }
            } else {
                rollScore = rollResult === MISS ? 0 : parseInt(rollResult);
                if (gameState.isFirstFrameRoll()) {
                    gameState.nextFrameRoll();
                } else {
                    gameState.nextFrame();
                }
            }

            return parseInt(total) + rollScore;
        };
    };

exports.getScore = function(arg) {
    var rolls = arg.split(''),
        gameState = {
            frame: 1,
            frameRoll: 1,
            nextFrame: function () {
                this.frame += 1;
                this.frameRoll = 1;
            },
            nextFrameRoll: function () {
                this.frameRoll += 1;
            },
            isFirstFrameRoll: function () {
                return this.frameRoll === 1
            },
            isFinalFrame: function () {
                return this.frame === FINAL_FRAME;
            }
        };

    var reducer = getReducer(gameState);

    return rolls.reduce(reducer, 0);
}
