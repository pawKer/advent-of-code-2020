import { getInstructionsToDataObject } from '../utils/instructions-to-data-object.js';
import { data, testData } from './input.js';

const dataObj = getInstructionsToDataObject(data);

console.log(dataObj)

let lineToExecute = 0;

let accumulator = 0;

while(!dataObj[lineToExecute].executed) {
    console.log(lineToExecute, dataObj[lineToExecute])
    if(dataObj[lineToExecute].instruction === 'nop') {
        dataObj[lineToExecute].executed = true;
        lineToExecute ++;
    } else if (dataObj[lineToExecute].instruction === 'acc') {
        accumulator += dataObj[lineToExecute].value
        dataObj[lineToExecute].executed = true;
        lineToExecute++;
    } else if (dataObj[lineToExecute].instruction === 'jmp') {
        dataObj[lineToExecute].executed = true;
        lineToExecute += dataObj[lineToExecute].value
    }
}

console.log(accumulator)