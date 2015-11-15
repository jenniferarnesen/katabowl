var expect = require('chai').expect,
    calc = require('../src/bowlCalculator');

describe('Bowling', function() {
    
    it('should correctly calculate the score with no strikes or spares', function () {
        var res = calc.getScore('18273642182736425481');
        expect(res).to.equal(84);
    });

    it('should correctly calculate the score with one strike', function () {
        var res = calc.getScore('18X3642182736425481');
        expect(res).to.equal(94);
    });

    it('should correctly calculate the score with one spare', function () {
        var res = calc.getScore('183/2642182736425481');
        expect(res).to.equal(86);
    });

    it('should correctly calculate the score with spare and strike in final frame', function () {
        var res = calc.getScore('3344225423451654362/X');
        expect(res).to.equal(86);
    });

    it('should correctly calculate the score with a mix of strikes and spares', function () {
        var res = calc.getScore('234/53X8/124563241/7');
        expect(res).to.equal(103);
    });

    it('should correctly calculate the score with strike and spare in final frame', function () {
        var res = calc.getScore('234/53X8/12456324X2/');
        expect(res).to.equal(106);
    });

    it('should correctly calculate the perfect score', function () {
        var res = calc.getScore('XXXXXXXXXXXX');
        expect(res).to.equal(300);
    });

    it('should correctly calculate a score with misses', function () {
        var res = calc.getScore('9-9-9-9-9-9-9-9-9-9-');
        expect(res).to.equal(90);
    });

    it('should correctly calculate a screw up at the end', function () {
        var res = calc.getScore('XXXXXXXXXX11');
        expect(res).to.equal(273);
    });

    it('should correctly calculate a score with all spares', function () {
        var res = calc.getScore('5/5/5/5/5/5/5/5/5/5/5');
        expect(res).to.equal(150);
    });

});
