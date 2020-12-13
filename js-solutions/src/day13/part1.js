import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData } from './input.js';

let dataArray = stringInputToArray(data);

const earliestTimestamp = parseInt(dataArray[0])
const busSchedule = dataArray[1].split(',')

let maxModulo = 0;
let closestDepartureBus = 0;
let closestDepartureTime = 0;

for(let i = 0; i < busSchedule.length; i++) {
    if(busSchedule[i] === 'x') {
        continue;
    } else {
        let busId = parseInt(busSchedule[i]);
        let modulo = earliestTimestamp % busId;
        if(modulo === 0) {
            closestDepartureBus = busId
            closestDepartureTime = earliestTimestamp - modulo + busId;
            break;
        }
        if(modulo > maxModulo) {
            maxModulo = modulo;
            closestDepartureBus = busId
            closestDepartureTime = earliestTimestamp - modulo + busId;
        }
    }
}

console.log('Closest departure bus: ', closestDepartureBus)
let minutesToWait = closestDepartureTime - earliestTimestamp
console.log('Minutes to wait: ', minutesToWait)
console.log('Result is: ', minutesToWait * closestDepartureBus)