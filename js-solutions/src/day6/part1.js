import { getPassportsFromStringToArray } from '../utils/passports-to-array.js';
import { data, testData } from './input.js';

const dataArray = getPassportsFromStringToArray(data);

const calculateAnswerSum = () => {
    let sum = 0;
    Object.entries(frequencyMap).forEach(([key, value]) => {
        if (value != 0){
            sum += 1
        }
    })
    return sum;
}

const resetFrequencyMap = () => {
    Object.entries(frequencyMap).forEach(([key, value]) => {
        frequencyMap[key] = 0;
    })
}

let frequencyMap = {}
let totalUniqueAnswerSum = 0;
for(let row = 0; row < dataArray.length; row++) {
    if(dataArray[row] === '') {
        totalUniqueAnswerSum += calculateAnswerSum();
        resetFrequencyMap();
        continue;
    }

    [...dataArray[row]].forEach((char) => {
        if(!frequencyMap[char]) {
            frequencyMap[char] = 1;
        }
    })

    if(row === dataArray.length - 1) {
        totalUniqueAnswerSum += calculateAnswerSum();
    }
}
console.log("Total sum = ", totalUniqueAnswerSum)