import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data } from './input.js';

const dataArray = stringInputToArray(data);

for(let i = 0; i < dataArray.length - 2; i++) {
    for(let j = i + 1; j < dataArray.length - 1; j++) {
        for(let k = j + 1; k < dataArray.length; k++) {
            let a = parseInt(dataArray[i])
            let b = parseInt(dataArray[j])
            let c = parseInt(dataArray[k])
            if(a + b + c === 2020) {
                console.log(a * b * c);
            }
        }
    }
}