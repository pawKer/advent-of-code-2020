import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData } from './input.js';

let dataArray = stringInputToArray(data);
let floorAfter = []

const modelSeatChoices = () => {
    let seatChanges = -1
    let occupiedSeats = 0;
    let loop = 0;
    while(seatChanges != 0) {
        occupiedSeats = 0;
        seatChanges = 0
        loop++;
        for(let row = 0; row < dataArray.length; row++) {
            let tempRow = dataArray[row]
            for(let col = 0; col < dataArray[row].length; col++) {
                if(dataArray[row][col] === '.') {
                    continue;
                }
                let adjacent = []
                if(col > 0){
                    // Left neighbour
                    adjacent.push(dataArray[row][col - 1])
                }

                if(col < dataArray[row].length - 1) {
                    // Right neighbour
                    adjacent.push(dataArray[row][col + 1])
                }

                if(row > 0) {
                    // Top neighbour
                    adjacent.push(dataArray[row - 1][col])
                }
                if(row < dataArray.length - 1) {
                    // Bottom neighbour
                    adjacent.push(dataArray[row + 1][col])
                }

                if(row > 0 && col < dataArray[row].length - 1) {
                    // Top-right neighbour
                    adjacent.push(dataArray[row - 1][col + 1])
                }

                if(col > 0 && row < dataArray.length - 1) {
                    // Bottom-left neighbour
                    adjacent.push(dataArray[row + 1][col - 1])
                }
                
                if(col < dataArray[row].length - 1 && row < dataArray.length - 1) {
                    // Bottom-right neighbour
                    adjacent.push(dataArray[row + 1][col + 1])
                }

                if(col > 0 && row > 0) {
                    // Top-left neighbour
                    adjacent.push(dataArray[row - 1][col - 1])
                }
                
                let allFree = true;
                let countOccupied = 0;
                
                
                adjacent.forEach(elem => {
                    if(elem === '#') {
                        allFree = false;
                        countOccupied++;
                    }
                })

                if(dataArray[row][col] === 'L') {
                    if(allFree) {
                        tempRow = setCharAt(tempRow,col,'#');
                        occupiedSeats++;
                        seatChanges++;
                    }
                }
                if(dataArray[row][col] === '#') {
                    if(countOccupied >= 4) {
                        tempRow = setCharAt(tempRow,col,'L');
                        seatChanges++;
                    } else {
                        occupiedSeats++;
                    }
                }
            }
            floorAfter[row] = tempRow;
        }

        console.log('\n')
        console.log('Loop', loop)
        console.log('Occupied seats', occupiedSeats)
        console.log('Seat changes', seatChanges)

        dataArray = floorAfter
        floorAfter = []
    }
}

const setCharAt = (str,index,chr) => {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

modelSeatChoices()