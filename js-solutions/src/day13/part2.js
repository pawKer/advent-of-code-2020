import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData, testData2 } from './input.js';

let dataArray = stringInputToArray(data);

const busSchedule = dataArray[1].split(',')

let numbers = []
let remainders = []
for(let i = 0; i < busSchedule.length; i++) {
    if(busSchedule[i] === 'x') {
        continue
    } else {
        let busId = parseInt(busSchedule[i]);
        numbers.push(busId)
        if(i === 0){
            remainders.push(0)
        } else {
            let temp = (-i) % busId
            if(temp < 0) {
                temp += busId
            }
            remainders.push(temp)
        }
    }
}

const moduloInverse = (a, m) => {
    let m0 = m;
    let x0 = 0;
    let x1 = 1;

    if(m === 1) {
        return 0;
    }

    let t, q;
    while(a > 1) {
        q = Math.floor(a / m)

        t = m

        m = a % m
        a = t

        t = x0

        x0 = x1 - q * x0

        x1 = t
    }

    if(x1 < 0) {
        x1 = x1 + m0;
    }

    return x1;
}

const findMinX = (numbers, remainders, numLen) => {
    let prod = 1;

    for(let i = 0; i < numLen; i++) {
        prod = prod * numbers[i];
    }

    let result = 0;
    for(let i = 0; i < numLen; i++) {
        let pp = Math.floor(prod / numbers[i]);
        result = result + remainders[i] * moduloInverse(pp, numbers[i]) * pp;
    }

    return result % prod;
}

console.log('Numbers: ', numbers)
console.log('Remainders: ', remainders)
console.log(findMinX(numbers, remainders, numbers.length))
console.log('Actual correct answer: 230903629977901')