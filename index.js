'use strict';
const Xray = require('x-ray');

class Probables {
    static get(dateString, callback) {

        let dateComponents = dateString.split('-');
        if (dateComponents.length !== 3) {
            dateComponents = dateString.split('/');
            if (dateComponents.length !== 3) {
                throw `Invalid date format. Use 'YYYY-MM-DD'`;
            }
        }
        const year = dateComponents[0];
        const month = dateComponents[1];
        const day = dateComponents[2];

        const url = `https://www.mlb.com/probable-pitchers/${year}-${month}-${day}`;
        const scope = 'body';
        const selector = {
            pitchers: ['div.probable-pitchers__pitcher-name a@href'],
            names: ['div.probable-pitchers__pitcher-name a'],
            throws: ['div.probable-pitchers__pitcher-details span.probable-pitchers__pitcher-pitch-hand'],
            teams: ['div.probable-pitchers__team-names span.probable-pitchers__team-name--away, div.probable-pitchers__team-names span.probable-pitchers__team-name--home'],
            games: ['div.probable-pitchers__matchup@data-gamePk'],
            startTimes: ['div.probable-pitchers__game-details div.probable-pitchers__game-date-time time@dateitme'],
            easternTimes: ['div.pitcher@eastern_time'],
            timezones: ['div.pitcher@local_time_zone']
        };

        const x = Xray();
        x(url, scope, selector)((err, result) => {

            if (err) {
                return callback(err);
            }
            const matchups = Probables.convertResult(result);
            return callback(null, matchups);
        });
    }

    static trimWhiteSpace(arr) {

        return arr.map((elem) => {

            return elem.replace(/\s/g, '');
        });
    }

    static convertResult(result) {

        const matchups = [];

        const pitcherIDInURL = /.*(\d{6}).*/;
        const pitcherIDs = result.pitchers.map((pitcher) => {

            const matches = pitcherIDInURL.exec(pitcher);
            if ( matches.length !== 2 ) {
                throw `Unexpected URL format while trying to extract pitcher ID: ${pitcher}`;
            }
            return matches[1];
        });
        const teams = Probables.trimWhiteSpace(result.teams);
        const names = result.names;
        const throws = Probables.trimWhiteSpace(result.throws);

        for (let i = 0; i < pitcherIDs.length; i += 2) {
            const j = i + 1;
            const matchup = {
                id: result.games[i],
                startTime: result.startTimes[i],
                easternTime: result.easternTimes[i],
                timezone: result.timezones[i],
                teams: {
                    away: teams[i],
                    home: teams[j]
                },
                pitchers: {
                    away: {
                        id: pitcherIDs[i],
                        name: names[i],
                        throws: throws[i]
                    },
                    home: {
                        id: pitcherIDs[j],
                        name: names[j],
                        throws: throws[j]
                    }
                }
            };

            matchups.push(matchup);
        }

        return matchups;
    }
}

module.exports = Probables;
