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
                    // Search all to the left
                    for(let i = col - 1; i >= 0; i--){
                        if(dataArray[row][i] !== '.') {
                            adjacent.push(dataArray[row][i])
                            break
                        }
                    }
                }

                if(col < dataArray[row].length - 1) {
                    // Search all to the right
                    for(let i = col + 1; i < dataArray[row].length; i++){
                        if(dataArray[row][i] !== '.') {
                            adjacent.push(dataArray[row][i])
                            break
                        }
                    }
                }

                if(row > 0) {
                    // Search all above
                    for(let i = row - 1; i >= 0; i--){
                        if(dataArray[i][col] !== '.') {
                            adjacent.push(dataArray[i][col])
                            break
                        }
                    }
                }

                if(row < dataArray.length - 1) {
                    // Search all below
                    for(let i = row + 1; i < dataArray.length; i++){
                        if(dataArray[i][col] !== '.') {
                            adjacent.push(dataArray[i][col])
                            break
                        }
                    }
                }

                if(row > 0 && col < dataArray[row].length - 1) {
                    // Search all top right diagonal
                    let i = row - 1;
                    let j = col + 1
                    while(i >= 0 && j < dataArray[i].length) {

                        if(dataArray[i][j] !== '.') {
                            adjacent.push(dataArray[i][j])
                            break
                        }
                        i--; 
                        j++;
                    }
                }

                if(col > 0 && row < dataArray.length - 1) {
                    // Search all bottom left diagonal
                    let i = row + 1;
                    let j = col - 1;
                    while(i < dataArray.length && j >= 0) {

                        if(dataArray[i][j] !== '.') {
                            adjacent.push(dataArray[i][j])
                            break
                        }
                        i++; 
                        j--;
                    }
                }
                
                if(col < dataArray[row].length - 1 && row < dataArray.length - 1) {
                    // Search all bottom right diagonal
                    let i = row + 1;
                    let j = col + 1;
                    while(i < dataArray.length && j < dataArray[i].length) {

                        if(dataArray[i][j] !== '.') {
                            adjacent.push(dataArray[i][j])
                            break
                        }
                        i++; 
                        j++;
                    }
                }

                if(col > 0 && row > 0) {
                    // Search all top left diagonal
                    let i = row - 1;
                    let j = col - 1;
                    while(i >= 0 && j >= 0) {

                        if(dataArray[i][j] !== '.') {
                            adjacent.push(dataArray[i][j])
                            break
                        }
                        i--; 
                        j--;
                    }
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
                    if(countOccupied >= 5) {
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