import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData1, testData2 } from './input.js';

let dataArray = stringInputToArray(data);

for(let i = 0; i < dataArray.length; i++) {
    dataArray[i] = parseInt(dataArray[i])
}

const MIN_JOLTAGE = 1
const MAX_JOLTAGE = 3

dataArray = dataArray.sort((a, b) => a > b ? 1 : -1)

let dataStore = {
    '0': 1
}

const findAllPossibleSolution = () => {
    for(let i = 0; i < dataArray.length; i++) {
        let countHopsRequired = 0;
        for(let j = MIN_JOLTAGE; j <= MAX_JOLTAGE; j++) {
            if(dataStore[dataArray[i] - j]) {
                countHopsRequired += dataStore[dataArray[i] - j]
            }
        }
        dataStore[dataArray[i]] = countHopsRequired
    }
    return dataStore[dataArray[dataArray.length - 1]]
}

console.log('Number of all possible permutations: ', findAllPossibleSolution())