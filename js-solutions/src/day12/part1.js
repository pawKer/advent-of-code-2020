import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData } from './input.js';

let dataArray = stringInputToArray(testData);

let currentDirection = 'east'
let moves = {
    'east': 0,
    'west': 0,
    'north': 0,
    'south': 0
}
let directionOrderRight = ['south', 'west', 'north', 'east']
let directionOrderLeft = ['north', 'west', 'south', 'east']
let newDirection = ''
let curIndex = 0
dataArray.forEach(inst => {
    let direction = inst[0];
    let value = parseInt(inst.substring(1))

    switch(direction) {
        case 'N':
            moves['north'] += value;
            break;
        case 'S':
            moves['south'] += value;
            break;
        case 'E':
            moves['east'] += value
            break;
        case 'W':
            moves['west'] += value
            break;
        case 'L':
            curIndex = directionOrderLeft.findIndex((el) => el === currentDirection)
            newDirection = directionOrderLeft[((value / 90)  + curIndex) % directionOrderLeft.length];
            currentDirection = newDirection
            break;
        case 'R':
            curIndex = directionOrderRight.findIndex((el) => el === currentDirection)
            newDirection = directionOrderRight[((value / 90) + curIndex) % directionOrderRight.length];
            currentDirection = newDirection;
            break;
        case 'F':
            let actualValue = value;
            if(currentDirection === 'south' && moves['north'] > 0){
                if(actualValue >= moves['north']) {
                    actualValue = actualValue - moves['north'];
                    moves['north'] = 0
                } else {
                    moves['north'] -= actualValue;
                    actualValue = 0;
                }
            }
            if(currentDirection === 'north' && moves['south'] > 0){
                if(actualValue >= moves['south']) {
                    actualValue = actualValue - moves['south'];
                    moves['south'] = 0
                } else {
                    moves['south'] -= actualValue;
                    actualValue = 0;
                }
            }
            if(currentDirection === 'west' && moves['east'] > 0){
                if(actualValue >= moves['east']) {
                    actualValue = actualValue - moves['east'];
                    moves['east'] = 0
                } else {
                    moves['east'] -= actualValue;
                    actualValue = 0;
                }
            }
            if(currentDirection === 'east' && moves['west'] > 0){
                if(actualValue >= moves['west']) {
                    actualValue = actualValue - moves['west'];
                    moves['west'] = 0
                } else {
                    moves['west'] -= actualValue;
                    actualValue = 0;
                }
            }
            moves[currentDirection] += actualValue;
            break;
        default:
            console.log('SOME OTHER VALUE')
    }
})
console.log('RESULT IS: ' ,moves)