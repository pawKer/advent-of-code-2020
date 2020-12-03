import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, slopes } from './input.js';

const dataArray = stringInputToArray(data);

let countProduct = 1;
slopes.forEach((slope) => {
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
        searchIndex += slope.right;
        row += slope.down;
    }
    countProduct = countProduct * count;
    console.log(count)
});
console.log(countProduct)