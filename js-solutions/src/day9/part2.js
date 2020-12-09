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

const findSumFactorsForN = n => {
    for(let numbersInSum = 2; numbersInSum < dataArray.length; numbersInSum++) {
        console.log("Checking all the sums of ", numbersInSum, "numbers.")
        for(let i = 0; i < dataArray.length; i++) {
            let sum = dataArray[i];
            let factors = []
            factors.push(dataArray[i])
            for(let j = i + 1; j < i + numbersInSum; j++) {
                sum += dataArray[j]
                factors.push(dataArray[j])
            }
            if(sum === n) {
                console.log("The numbers that sum to N are: ", factors)
                factors.sort()
                return factors[0] + factors[factors.length - 1]
            } 
        }
    }
}

const PREAMBLE = 25
const PREVOUS_TO_CONSIDER = 25
let n =  findInvalidNoInSequence(PREAMBLE, PREVOUS_TO_CONSIDER)
console.log("The answer is : ", findSumFactorsForN(n))