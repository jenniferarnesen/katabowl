var counter = require('./src/counter'), 
    arg = process.argv.slice(2),
    total = counter.calculateScore(arg[0]);

console.log('total score is', total);
