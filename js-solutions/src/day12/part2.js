import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData } from './input.js';

let dataArray = stringInputToArray(data);

let moves = {
    'east': 0,
    'west': 0,
    'north': 0,
    'south': 0
}
let waypoint = {
    'east': 10,
    'west': 0,
    'north': 1,
    'south': 0
}
let directionOrderRight = ['south', 'west', 'north', 'east']
let directionOrderLeft = ['north', 'west', 'south', 'east']
let tempWaypoint = {}
dataArray.forEach(inst => {
    let direction = inst[0];
    let value = parseInt(inst.substring(1))

    switch(direction) {
        case 'N':
            waypoint['north'] += value;
            break;
        case 'S':
            waypoint['south'] += value;
            break;
        case 'E':
            waypoint['east'] += value
            break;
        case 'W':
            waypoint['west'] += value
            break;
        case 'L':
            tempWaypoint = JSON.parse(JSON.stringify(waypoint));
            Object.keys(waypoint).forEach(key => {
                let curIndex = directionOrderLeft.findIndex((el) => el === key)
                let newDirection = directionOrderLeft[((value / 90) + curIndex) % directionOrderLeft.length];
                waypoint[newDirection] = tempWaypoint[key]
            })
            break;
        case 'R':
            tempWaypoint = JSON.parse(JSON.stringify(waypoint));
            Object.keys(waypoint).forEach(key => {
                let curIndex = directionOrderRight.findIndex((el) => el === key)
                let newDirection = directionOrderRight[((value / 90) + curIndex) % directionOrderRight.length];
                waypoint[newDirection] = tempWaypoint[key]
            })
            break;
        case 'F':
            let actualEast = waypoint['east'] * value;
            let actualWest = waypoint['west'] * value;
            let actualNorth = waypoint['north'] * value;
            let actualSouth = waypoint['south'] * value;

            if(actualEast > actualWest) {
                actualEast -= actualWest
                actualWest = 0;
            } else {
                actualWest -= actualEast
                actualEast = 0;
            }

            if(actualNorth > actualSouth) {
                actualNorth -= actualSouth
                actualSouth=0;
            } else {
                actualSouth -= actualNorth
                actualNorth = 0;
            }

            if(actualSouth > 0 && moves['north'] > 0){
                if(actualSouth >= moves['north']) {
                    actualSouth = actualSouth - moves['north'];
                    moves['north'] = 0
                } else {
                    moves['north'] -= actualSouth;
                    actualSouth = 0;
                }
            }
            if(actualNorth > 0 && moves['south'] > 0){
                if(actualNorth >= moves['south']) {
                    actualNorth = actualNorth - moves['south'];
                    moves['south'] = 0
                } else {
                    moves['south'] -= actualNorth;
                    actualNorth = 0;
                }
            }
            if(actualWest > 0 && moves['east'] > 0){
                if(actualWest >= moves['east']) {
                    actualWest = actualWest - moves['east'];
                    moves['east'] = 0
                } else {
                    moves['east'] -= actualWest;
                    actualWest = 0;
                }
            }
            if(actualEast > 0 && moves['west'] > 0){
                if(actualEast >= moves['west']) {
                    actualEast = actualEast - moves['west'];
                    moves['west'] = 0
                } else {
                    moves['west'] -= actualEast;
                    actualEast = 0;
                }
            }

            moves['east'] += actualEast;
            moves['west'] += actualWest;
            moves['north'] += actualNorth
            moves['south'] += actualSouth;
            break;
        default:
            console.log('SOME OTHER VALUE')
    }
})
console.log('RESULT IS: ' ,moves)