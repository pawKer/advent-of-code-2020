import { stringInputToArray } from '../utils/string-input-to-array.js';
import { setCharAt } from '../utils/set-char-at-index.js';
import { data, testData, testData2 } from './input.js';

let dataArray = stringInputToArray(data);

const dec2bin = (dec) => {
    let bin = (dec >>> 0).toString(2)
    let initialLen = bin.length
    // Pad with 0s until 36 bits
    for(let i = 0; i < (36 - initialLen); i++) {
        bin = '0'.concat(bin)
    }
    return bin;
}

const allPossibleValues = (binaryStr, floatingBits) => {
   let values = [binaryStr];

   /* 
      Iterate until we have all the 2^floatingBits solutions
      For each value in the array, remove that value, 
      replace one X in the binary string 
      with 0 and 1 and add back to array until all the
      values in the array won't have X's in them
   */
   while(values.length < Math.pow(2, floatingBits)) {
       // Get first element in array and remove it from the array
       let curVal = values.shift()
       
       // Replace first encountered X with 0 and 1 and add back to array
       for(let j = 0; j < curVal.length; j++) {
           if(curVal[j] === 'X') {
               values.push(setCharAt(curVal, j, '0'))
               values.push(setCharAt(curVal, j, '1'))
               break;
           }
       }
   }
   return values;
}

let currentMask, currentMemAddr, currentMemAddrBianary;
let currentValue = 0;
let mem = []
let sum = 0
dataArray.forEach(line => {
    let tokens = line.split(' ');
    if(tokens[0] === 'mask'){
        currentMask = tokens[2]
        console.log('Mask:            ', currentMask)
    } else {
        console.log('=====================')
        currentMemAddr = tokens[0].replace('mem', '');
        currentMemAddr = currentMemAddr.replace('[', '')
        currentMemAddr = parseInt(currentMemAddr.replace(']', ''))
        currentValue = parseInt(tokens[2])
        currentMemAddrBianary = dec2bin(currentMemAddr)
        console.log('Memory address: ', currentMemAddr)
        console.log('Memory address to binary: ', currentMemAddrBianary)
        console.log('Value to store: ', currentValue)
        
        let result = ''
        let floatingBits = 0;
        for(let i = 0; i < currentMask.length; i++){
            if(currentMask[i] === 'X') {
                result += currentMask[i]
                floatingBits++;
            } else if (currentMask[i] === '0'){
                result += currentMemAddrBianary[i]
            } else if (currentMask[i] === '1') {
                result += currentMask[i]
            }  
        }
        let posValues = allPossibleValues(result, floatingBits)
        console.log('Floating bits: ', floatingBits)
        console.log('Possible solutions: ', posValues.length)
        posValues.forEach(val => {
            let valToDec = parseInt(val, 2)
            if(mem[valToDec]) {
                sum = sum - mem[valToDec] + currentValue
                mem[valToDec] = currentValue
            } else {
                mem[valToDec] = currentValue
                sum += currentValue;
            }
            
        })
        console.log('Result:          ', result)
    }
})

console.log('Final sum: ', sum)