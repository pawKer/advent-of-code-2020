import { getInstructionsToDataObject } from '../utils/instructions-to-data-object.js';
import { data, testData } from './input.js';

const dataObj = getInstructionsToDataObject(data);

console.log(dataObj)

const MAX_EXECUTION_STEPS = 10000

const runProgramWithFix = (fixLine) => {
    let copyData = JSON.parse(JSON.stringify(dataObj));

    console.log('Line before fix: ', copyData[fixLine])

    if(copyData[fixLine].instruction === 'nop') {
        copyData[fixLine].instruction = 'jmp'
        copyData[fixLine].executed = false;
    } else if (copyData[fixLine].instruction === 'jmp') {
        copyData[fixLine].instruction = 'nop'
        copyData[fixLine].executed = false;
    } else {
        // If the line we wanted to fix is not a nop or jmp instruction
        // we skip this run
        return false;
    }

    console.log('Line after fix: ', copyData[fixLine])

    let steps = 0
    let lineToExecute = 0;
    let accumulator = 0;

    while(lineToExecute < copyData.length && steps < MAX_EXECUTION_STEPS) {
        if(copyData[lineToExecute].instruction === 'nop') {
            copyData[lineToExecute].executed = true;
            lineToExecute ++;
        } else if (copyData[lineToExecute].instruction === 'acc') {
            accumulator += copyData[lineToExecute].value
            copyData[lineToExecute].executed = true;
            lineToExecute++;
        } else if (copyData[lineToExecute].instruction === 'jmp') {
            copyData[lineToExecute].executed = true;
            lineToExecute += copyData[lineToExecute].value
        }
        steps++;
    }

    if(steps >= MAX_EXECUTION_STEPS) {
        console.log("INFINITE LOOP DETECTED")
        return false;
    } 
    if(lineToExecute >= copyData.length) {
        console.log("PROGRAM RUNS FINE")
        return accumulator;
    }
    console.log("SOMETHING ELSE")
    return false;

}

let lineToFix = 0;
while(lineToFix < dataObj.length) {
    console.log('Trying line:', lineToFix)
    let result = runProgramWithFix(lineToFix)

    if(result !== false) {
        console.log("Found result: ", result)
        break;
    }

    lineToFix++;
}