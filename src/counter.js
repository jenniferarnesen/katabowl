var STRIKE = 'X',
    SPARE = '/',
    MAX_ROLL_SCORE = 10;

exports.calculateScore = function(arg) {

    var FINAL_TURN = 10,
        turn = 1,
        totalScore = 0,
        rolls = arg.split(''),
        turnRoll = 1,
        rollResult,
        rollScore,
        i;

    for (i = 0; i < rolls.length; ++i) {
        rollResult = rolls[i];
        rollScore = 0;

        if (rollResult === STRIKE) {
            rollScore = MAX_ROLL_SCORE;

            if (turn !== FINAL_TURN) {
                rollScore += calcBonus(rolls[i+1], rolls[i+2]);
                ++turn;
            }
            
        } else if (rollResult === SPARE) {
            rollScore = MAX_ROLL_SCORE - rolls[i-1]; //subtract the score from first turn roll
            if (turn !== FINAL_TURN) {
                rollScore += calcBonus(rolls[i+1], 0);
                ++turn;
                turnRoll = 1;
            }
        } else {
            rollScore = parseInt(rollResult);
            if (turnRoll === 1) {
                turnRoll = 2;
            } else {
                turnRoll = 1;
                ++turn;
            }
        }

        totalScore += rollScore;
    }

    return totalScore;
};

function calcBonus(next1, next2) {
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



