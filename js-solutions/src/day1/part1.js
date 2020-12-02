import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data } from './input.js';

const dataArray = stringInputToArray(data);

for(let i = 0; i < dataArray.length - 2; i++) {
    for(let j = i + 1; j < dataArray.length - 1; j++) {
        let a = parseInt(dataArray[i])
        let b = parseInt(dataArray[j])
        if(a + b === 2020) {
            console.log(a * b);
        }
    }
}