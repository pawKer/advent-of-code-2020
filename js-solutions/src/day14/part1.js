import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData } from './input.js';

let dataArray = stringInputToArray(data);

function dec2bin(dec){
    let bin = (dec >>> 0).toString(2)
    let initialLen = bin.length
    for(let i = 0; i < (36 - initialLen); i++) {
        bin = '0'.concat(bin)
    }
    return bin;
}

let currentMask = ''
let currentMemAddr = ''
let currentValue = 0;
let currentValueBinary = ''
let mem = []
dataArray.forEach(line => {
    let tokens = line.split(' ');
    if(tokens[0] === 'mask'){
        currentMask = tokens[2]
        console.log(tokens)
        console.log('Mask:            ', currentMask)
    } else {
        currentMemAddr = tokens[0].replace('mem', '');
        currentMemAddr = currentMemAddr.replace('[', '')
        currentMemAddr = currentMemAddr.replace(']', '')
        currentValue = parseInt(tokens[2])
        currentValueBinary = dec2bin(currentValue)
        console.log('Memory address: ', currentMemAddr)
        console.log('Value to store: ', currentValue)
        console.log('Value to binary: ', currentValueBinary)
        let result = ''
        console.log(currentValueBinary.length);
        console.log(currentMask.length);
        for(let i = 0; i < currentMask.length; i++){
            if(currentMask[i] !== 'X') {
                result += currentMask[i]
            } else {
                result += currentValueBinary[i]
            }
        }
        console.log('Result:          ', result)
        let valueToStore = parseInt(result, 2)
        console.log('Value to store: ', valueToStore)
        mem[currentMemAddr] = valueToStore
    }
})
let sum = 0;
mem.forEach(elem => {
    sum += elem
})
console.log('Final sum: ', sum)