# mlbprobablepitchers
Get JSON object with MLB Probable Pitchers for a given day

## Install
```
npm install mlbprobablepitchers
```

## Usage
```javascript
const Probables = require('mlbprobablepitchers');
const day = '2011/07/23';

Probables.get(day, (err, matchups) => {

  // do something
});
```

## Example matchup
```javascript
{
    "id": "2011/07/23/houmlb-chnmlb-1",
    "startTime": "2011-07-23T12:05:00",
    "easternTime": "2011-07-23T13:05:00",
    "timezone": "CDT",
    "teams": {
        "away": "112",
        "home": "117"
    },
    "pitchers": {
        "away": {
            "id": "434643",
            "name": "Wandy Rodriguez",
            "throws": "LHP"
        },
        "home": {
            "id": "448694",
            "name": "Randy Wells",
            "throws": "RHP"
        }
    }
}
```
