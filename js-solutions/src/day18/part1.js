import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData } from './input.js';

const readDataIntoArray = (data) => {
    let returnArray = []
    for(let i = 0; i < data.length; i++) {
        if(data[i] !== ' ') {
            returnArray.push(data[i])
        }
    }

    return returnArray
}

const calculateBrackets = (index) => {
    let total = 0;
    let openBrackets = 1;
    let previousOp = -1;
    index = index + 1;
    let steps = 0;
    while(openBrackets > 0) {
        console.log('\t', index, ' current char: ', ex[index], 'current total: ', total)
        if(ex[index] === '+') {
            previousOp = '+'
        } else if (ex[index] === '*') {
            previousOp = '*'
        } else if(ex[index] === '(') {
            console.log('Hit bracket')
            if(previousOp === -1 || previousOp === '+') {
                let result = calculateBrackets(index)
                total += result.total
                steps += result.steps
                index += result.steps
            } else {
                let result = calculateBrackets(index)
                total *= result.total
                steps += result.steps
                index += result.steps
            }
            
        } else if (ex[index] === ')') {
            openBrackets--;
        } else {
            if(previousOp === -1 || previousOp === '+') {
                total += parseInt(ex[index])
            } else {
                total *= parseInt(ex[index])
            }
        }
        steps++;
        index++;
    }
    console.log('\treturning total: ', total, 'returning steps: ', steps)
    return { 'total': total, 'steps': steps }
}

let dataArray = stringInputToArray(data)
let finalSum = 0
let ex;
dataArray.forEach(row => {
    ex = readDataIntoArray(row)
    console.log(ex)
    let total = 0;
    let previousOp = -1;
    for(let i = 0; i < ex.length; i++) {
        console.log(i, ' current char: ', ex[i], 'current total: ', total)
        if(ex[i] === '+') {
            previousOp = '+'
        } else if (ex[i] === '*') {
            previousOp = '*'
        } else if(ex[i] === '(') {
            console.log('Hit bracket')
            if(previousOp === -1 || previousOp === '+') {
                let result = calculateBrackets(i)
                total += result.total
                i += result.steps
            } else {
                let result = calculateBrackets(i)
                total *= result.total
                i += result.steps
            }
            
        } else if (ex[i] === ')') {
            // calculateBrackets(i)
        } else {
            if(previousOp === -1 || previousOp === '+') {
                total += parseInt(ex[i])
            } else {
                total *= parseInt(ex[i])
            }
        }
    }
    finalSum += total
})
console.log('Final result: ', finalSum)