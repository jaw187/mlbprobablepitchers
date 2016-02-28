'use strict';


const Code = require('code');
const Lab = require('lab');
const Probables = require('../');


const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('MLB Probable Pitchers', () => {

    it('Gets probables', (done) => {

        const day = '2011/07/23';
        Probables.get(day, (err, matchups) => {

            expect(err).to.not.exist();
            expect(matchups).to.exist();
            expect(matchups.length).to.equal(14);

            done();
        });
    });
});
