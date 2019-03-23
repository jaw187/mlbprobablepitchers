'use strict';

const Probables = require('../');
const { expect } = require('code');
const { it, describe } = exports.lab = require('lab').script();

describe('MLB Probable Pitchers', () => {

    const day = '2011/07/23';
    it(`Gets probables using date syntax ${day}`, (done) => {

        Probables.get(day, (err, dailyMatchups) => {

            try {
                expect(err).to.not.exist();
                expect(dailyMatchups).to.exist();
                expect(dailyMatchups.length).to.equal(15);
                expect(dailyMatchups[0].teams).to.exist();
                expect(dailyMatchups[0].teams.away).to.equal('Astros');
                expect(dailyMatchups[0].pitchers).to.exist();
                expect(dailyMatchups[0].pitchers.away).to.exist();
                expect(dailyMatchups[0].pitchers.away.id).to.equal('434643');
                expect(dailyMatchups[0].pitchers.home).to.exist();
                expect(dailyMatchups[0].pitchers.home.id).to.equal('448694');
                done();
            }
            catch (err) {
                return done(err);
            }
        });
    });

    const dateDashes = '2011-07-23';
    it(`Gets probables using date syntax ${dateDashes}`, (done) => {

        Probables.get(day, (err, dailyMatchups) => {

            expect(err).to.not.exist();
            expect(dailyMatchups).to.exist();
            expect(dailyMatchups.length).to.equal(15);
            expect(dailyMatchups[0].teams).to.exist();
            expect(dailyMatchups[0].teams.away).to.equal('Astros');
            expect(dailyMatchups[0].pitchers).to.exist();
            expect(dailyMatchups[0].pitchers.away).to.exist();
            expect(dailyMatchups[0].pitchers.away.id).to.equal('434643');
            expect(dailyMatchups[0].pitchers.home).to.exist();
            expect(dailyMatchups[0].pitchers.home.id).to.equal('448694');
            done();

        });
    });

    const invalidDate = '2011-07';
    it(`Fails with invalid date syntax ${invalidDate}`, (done) => {

        Probables.get(day, (err, dailyMatchups) => {

            try {
                expect(err).to.exist();
                done();
            }
            catch (err) {
                return done(err);
            }
        });
    });
});
