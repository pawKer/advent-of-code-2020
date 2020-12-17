import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData } from './input.js';

let dataArray = stringInputToArray(data);
let cube = []

for(let i = 0; i < dataArray.length; i++) {
    for(let j = 0; j < dataArray[i].length; j++) {
        if(dataArray[i][j] === '#') {
            cube.push([i, j, 0, 0])
        }
    }
}

console.log('Stating active: ', cube.length)

const checkIfArrayContainsArray = (arr1, arr2) => {
    for(let i = 0; i < arr1.length; i++) {
        let curEquals = true;
        for(let j = 0; j < arr1[i].length; j++) {
            if(arr1[i][j] !== arr2[j]) {
                curEquals = false
                break;
            }
        }
        if(curEquals) {
            return true
        }
    }
    return false
}

const getNumberOfNeighbors = (point) => {
    let total = 0;
    for(let x = -1; x < 2; x++) {
        for(let y = -1; y < 2; y++) {
            for(let z = -1; z < 2; z++) {
                for(let w = -1; w < 2; w++) {
                    if(x != 0 || y != 0 || z != 0 || w != 0) {
                        let np = [point[0] + x, point[1] + y, point[2] + z, point[3] + w]
                        let isInCube = checkIfArrayContainsArray(cube, np)
                        if (isInCube) {
                            total++;
                        }
                    }
                }
            }
        }
    }
    return total
}

for(let m = 0; m < 6; m++) {
    let future_active = []
    cube.forEach(elem => {
        let no = getNumberOfNeighbors(elem)
        if(no === 2 || no === 3) {
            future_active.push(elem)
        }
        for(let x = -1; x < 2; x++) {
            for(let y = -1; y < 2; y++) {
                for(let z = -1; z < 2; z++) {
                    for(let w = -1; w < 2; w++) {
                        if(x != 0 || y != 0 || z != 0 || w != 0) {
                            let neighbor = [elem[0] + x, elem[1] + y, elem[2] + z, elem[3] + w]
                            if (!checkIfArrayContainsArray(cube, neighbor)) {
                                let no2 = getNumberOfNeighbors(neighbor)
                                if(no2 === 3) {
                                    future_active.push(neighbor)
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    let future = []
    future_active.forEach(elem => {
        if(!checkIfArrayContainsArray(future, elem)){
            future.push(elem)
        }
    })
    cube = future;
}
// let test = [[5, 3, 4], [1, 2, 4], [9, 0 , 1]]
// console.log(checkIfArrayContainsArray(test, [1, 2, 3]))
console.log('End active: ', cube.length)