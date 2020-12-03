import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data } from './input.js';

const dataArray = stringInputToArray(data);

let row = 0;
let searchIndex = 0;
let count = 0;
while(row < dataArray.length) {
    if(searchIndex < dataArray[row].length){
        if(dataArray[row][searchIndex] === '#') {
            count++;
        }
    } else {
        searchIndex = searchIndex - dataArray[row].length;
        if(dataArray[row][searchIndex] === '#') {
            count++;
        }
    }
    searchIndex += 3;
    row++;
}
console.log(count)