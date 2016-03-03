# mlbprobablepitchers
Get JSON object with MLB Probable Pitchers for a given day

## Install
```
npm install mlbprobablepitchers
```

## Usage
```
const Probables = require('mlbprobablepitchers');
const day = '2011/07/23';

Probables.get(day, (err, matchups) => {

  // do something
});
```
