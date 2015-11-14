var STRIKE = 'X',
    SPARE = '/',
    MISS = '-',
    MAX_ROLL_SCORE = 10,
    FINAL_FRAME = 9,
    FIRST_ROLL = 0,
    SECOND_ROLL = 1,

    parseIntoFrames = function (rolls) {
        var frames = [],
            fi = 0,
            frameRoll = FIRST_ROLL,
            roll,

            initializeNextFrame = function () {
                fi += 1;
                frames[fi] = [];
                frameRoll = FIRST_ROLL;
            };

            frames[fi] = [];

        for (var i = 0; i < rolls.length; i+=1) {
            roll = rolls[i];
            if (roll === STRIKE || roll === SPARE) {
                frames[fi][frameRoll] = roll;
                if (fi !== FINAL_FRAME) {
                    initializeNextFrame();
                } else {
                    frameRoll += 1;
                }
            } else {
                frames[fi][frameRoll] = roll;
                if (frameRoll === SECOND_ROLL && fi !== FINAL_FRAME) {
                    initializeNextFrame();
                } else {
                    frameRoll += 1;
                }
            }
        }

        return frames;
    },

    /**
     * Calculate the total score for the game. When a spare or strike is
     * rolled, then a bonus is added to the score, unless the player is
     * on the final frame.
     *
     * This function is supplied to array.reduce
     */
    calculateScore = function (total, frameResult, fi, frames) {
        var frameScore = 0,
            rollResult;

        for (var i = 0; i < frameResult.length; i += 1) {
            rollResult = frameResult[i];

            if (rollResult === STRIKE) {
                frameScore += MAX_ROLL_SCORE;
                if (fi !== FINAL_FRAME) {
                    frameScore += calculateBonus(rollResult, fi, frames);
                }
            } else if (rollResult === SPARE) {
                if (fi !== FINAL_FRAME) {
                    frameScore = MAX_ROLL_SCORE + calculateBonus(rollResult, fi, frames);
                } else {
                        frameScore = frameScore + MAX_ROLL_SCORE - frameResult[i-1];
                }
            } else {
                frameScore += rollResult === MISS ? 0 : parseInt(rollResult);
            }
        }

        return parseInt(total) + frameScore;
    },

    /**
     * Calculate the bonus for the frame. The rules
     * determining this logic can be found here:
     * https://en.wikipedia.org/wiki/Ten-pin_bowling#Scoring
     */
    calculateBonus = function (rollResult, fi, frames) {
        var next1 = frames[fi+1][FIRST_ROLL],
            next2 = 0;

        next1 = next1 === STRIKE ? MAX_ROLL_SCORE : parseInt(next1);

        if (rollResult === STRIKE) {
            if (frames[fi+1][SECOND_ROLL]) {
                next2 = frames[fi+1][SECOND_ROLL];
            } else {
                next2 = frames[fi+2][FIRST_ROLL];
            }

            if (next2 === STRIKE) {
                next2 = MAX_ROLL_SCORE;
            } else if (next2 === SPARE) {
                next2 = MAX_ROLL_SCORE - next1;
            } else {
                next2 = parseInt(next2)
            };
        }

        return next1 + next2;
    };

exports.getScore = function(arg) {
    var rolls = arg.split(''),
        frames = parseIntoFrames(rolls);


    return frames.reduce(calculateScore, 0);
}