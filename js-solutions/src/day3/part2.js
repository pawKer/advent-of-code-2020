import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, slopes } from './input.js';

const dataArray = stringInputToArray(data);

const getTreeCountProductInefficient = (data, slopes) => {
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
    });
    return countProduct;
};
console.log(getTreeCountProductInefficient(dataArray, slopes))

const getTreeCountProductEfficient = (dataArray, slopes) => {
    let searchIndices = new Array(slopes.length).fill(0);
    let counts = new Array(slopes.length).fill(0);
    let row = 0;
    while(row < dataArray.length) {
        for(let j = 0; j < slopes.length; j++) {
            let rowToSearch = row * slopes[j].down;
            if(rowToSearch >= dataArray.length) {
                continue;
            }
            if(searchIndices[j] < dataArray[rowToSearch].length){
                if(dataArray[rowToSearch][searchIndices[j]] === '#') {
                    counts[j]++;
                }
            } else {
                searchIndices[j] = searchIndices[j] - dataArray[rowToSearch].length;
                if(dataArray[rowToSearch][searchIndices[j]] === '#') {
                    counts[j]++;
                }
            }
            searchIndices[j] += slopes[j].right;
        }
        row++;
    }
    
    let countProduct = 1;
    counts.forEach((count) => {
        countProduct = countProduct * count;
    })

    return countProduct;

};
console.log(getTreeCountProductEfficient(dataArray, slopes))