import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData1 } from './input.js';

const dataArray = stringInputToArray(data);

for(let i = 0; i < dataArray.length; i++) {
    dataArray[i] = parseInt(dataArray[i])
}


const findInvalidNoInSequence = (preamble, previousToConsider) => {
    for(let i = preamble; i < dataArray.length; i++) {
        let valid = false;
        console.log('Checking number :', dataArray[i])
        for(let j = i - previousToConsider; j < i; j++) {
            for(let k = j + 1; k < i; k++) {
                console.log('\tIs it the sum of ', dataArray[j], 'and', dataArray[k], '?')
                if(dataArray[j] + dataArray[k] === dataArray[i] && dataArray[j] !== dataArray[k]) {
                    valid = true;
                    console.log('\t\t Yes')
                }
            }
        }
        if(!valid) {
            return dataArray[i];
        }
    }
}

console.log("The invalid number is: ", findInvalidNoInSequence(25, 25))