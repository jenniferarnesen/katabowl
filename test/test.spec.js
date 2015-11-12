var expect = require('chai').expect,
    counter = require('../src/counter');

describe('Bowling', function() {
    
    it('should correctly calculate the score with no strikes or spares', function () {
        var res = counter.calculateScore('18273642182736425481');
        expect(res).to.equal(84);
    });

    it('should correctly calculate the score with one strike', function () {
        var res = counter.calculateScore('18X3642182736425481');
        expect(res).to.equal(94);
    });

    it('should correctly calculate the score with one spare', function () {
        var res = counter.calculateScore('183/2642182736425481');
        expect(res).to.equal(86);
    });

    it('should correctly calculate the score with a mix of strikes and spares', function () {
        var res = counter.calculateScore('234/53X8/124563241/7');
        expect(res).to.equal(103);
    });

    it('should correctly calculate the perfect score', function () {
        var res = counter.calculateScore('XXXXXXXXXXXX');
        expect(res).to.equal(300);
    });

    it('should correctly calculate a score with all spares', function () {
        var res = counter.calculateScore('5/5/5/5/5/5/5/5/5/5/5');
        expect(res).to.equal(150);
    });

});
