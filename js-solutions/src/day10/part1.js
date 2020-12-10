import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData1, testData2 } from './input.js';

let dataArray = stringInputToArray(data);

for(let i = 0; i < dataArray.length; i++) {
    dataArray[i] = parseInt(dataArray[i])
}

const MIN_JOLTAGE = 1
const MAX_JOLTAGE = 3
const DEVICE_JOLTAGE_OFFSET = 3
const OUTLET_JOLTAGE = 0

dataArray = dataArray.sort((a, b) => a > b ? 1 : -1)

let differencesOfOne = 0;
let differencesOfThree = 1;
let currentAdaptorRating = OUTLET_JOLTAGE;
for(let i = 0; i < dataArray.length; i++) {
    let topBoundary = currentAdaptorRating + MAX_JOLTAGE;
    let bottomBoundary = currentAdaptorRating + MIN_JOLTAGE;
    if(dataArray[i] >= bottomBoundary && dataArray[i] <= topBoundary){
        if(dataArray[i] - currentAdaptorRating === MIN_JOLTAGE) {
            differencesOfOne++;
        } else if(dataArray[i] - currentAdaptorRating === MAX_JOLTAGE) {
            differencesOfThree++;
        }
        currentAdaptorRating = dataArray[i];
    }
}
console.log('Differences of 1: ', differencesOfOne, '| Differences of 3: ',differencesOfThree)
console.log("The result is: ", differencesOfOne * differencesOfThree)