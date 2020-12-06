import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData } from './input.js';

const dataArray = stringInputToArray(data);

const END_ROW = 127;
const END_SEAT = 7;

let maxSeatId = 0;
let seatMap = []
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
    
    seatMap = [
        ...seatMap, 
        {
            "row": finalRow,
            "seat": finalSeat,
            "seatID": seatId
        }
    ]

})
seatMap.sort((a,b) => (a.seatID > b.seatID) ? 1 : -1)

for(let i = 1; i < seatMap.length - 1; i++) {
    if (seatMap[i].seatID - seatMap[i-1].seatID > 1) {
        console.log(seatMap[i].seatID - 1)
    }
}
