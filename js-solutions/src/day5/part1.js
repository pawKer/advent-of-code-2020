import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData } from './input.js';

const dataArray = stringInputToArray(data);

const END_ROW = 127;
const END_SEAT = 7;

let maxSeatId = 0;
dataArray.forEach((encodedSeat) => {
    let rowStart = 0;
    let rowEnd = END_ROW;

    let seatStart = 0;
    let seatEnd = END_SEAT;
    [...encodedSeat].forEach((char) => {
        if (char === 'F') {
            rowEnd = Math.floor((rowEnd + rowStart) / 2);
        } 
        if (char === 'B') {
            rowStart = Math.floor((rowEnd + rowStart) / 2) + 1;
        }

        if (char === 'L') {
            seatEnd = Math.floor((seatStart + seatEnd) / 2);
        }
        if(char === 'R') {
            seatStart = Math.floor((seatStart + seatEnd) / 2) + 1;
        }
    })

    let finalRow = 0;
    let finalSeat = 0;

    if(seatStart >= seatEnd) {
        finalSeat = seatEnd;
    } else {
        finalSeat = seatStart;
    }

    if(rowStart >= rowEnd) {
        finalRow = rowEnd;
    } else {
        finalRow = rowStart;
    }

    let seatId = (finalRow * 8) + finalSeat;
    if (seatId > maxSeatId) {
        maxSeatId = seatId;
    }
})

console.log("Max seatId: ", maxSeatId)