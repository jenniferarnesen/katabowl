var calc = require('./src/bowlCalculator'), 
    arg = process.argv.slice(2),
    total = calc.getScore(arg[0]);

console.log('total score is', total);
