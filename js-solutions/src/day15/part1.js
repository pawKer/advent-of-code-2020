import { inputData } from './input.js';

let dataArray = inputData.split(',')
let data = []

const nthNumberToGet = (n) => {
    let lastSpokenNumber = 0;
    let curNumber = 0;
    for(let i = 0; i < n; i++) {
        if(i < dataArray.length) {
            curNumber = parseInt(dataArray[i])
        } else {
            if(data[lastSpokenNumber].timesSpoken === 1) {
                curNumber = 0
            } else {
                curNumber = data[lastSpokenNumber].lastTurnSpoken - data[lastSpokenNumber].lastTurnSpokenBefore;
            }
        }
        if(!data[curNumber]) {
            data[curNumber] = {
                timesSpoken: 1,
                lastTurnSpoken: i + 1,
                lastTurnSpokenBefore: -1
            }
        } else {
            data[curNumber].timesSpoken = data[curNumber].timesSpoken + 1;
            data[curNumber].lastTurnSpokenBefore = data[curNumber].lastTurnSpoken;
            data[curNumber].lastTurnSpoken = i + 1;
        }
        console.log('Turn ', i + 1, 'speaking: ', curNumber)
        lastSpokenNumber = curNumber
    }
}

// Part 1
nthNumberToGet(2020)

// Part 2 - brute force
nthNumberToGet(30000000)