import { luggageRulesToDataObject } from '../utils/luggage-rules-to-data-object.js';
import { data, testData, testData2 } from './input.js';

const dataObj = luggageRulesToDataObject(testData);
let sum = 0;
const howManyCanContain = ((bagTypeToCheck) => {
    for(let i = 0; i < dataObj.length; i++) {
        if(dataObj[i]['bagType'] === bagTypeToCheck) {
            console.log("Checking ", dataObj[i]['bagType'])
            for(let j = 0; j < dataObj[i]['canContain'].length; j++) {
                if(dataObj[i]['canContain'][j]['bagType'] === 'noother'){
                    console.log("Stopping")
                    return;
                }
                let totalOfSub = calculateTotalBags(dataObj[i]['canContain'][j]['bagType'])
                sum = sum + dataObj[i]['canContain'][j]['quantity'] + dataObj[i]['canContain'][j]['quantity'] * totalOfSub;
            }
        }
    }
})

const calculateTotalBags = ((bagType) => {
    let subSum = 0;
    for(let i = 0; i < dataObj.length; i++) {
        if(dataObj[i]['bagType'] === bagType) {
            console.log("\t Checking ", dataObj[i]['bagType'])
            for(let j = 0; j < dataObj[i]['canContain'].length; j++) {
                if(dataObj[i]['canContain'][j]['bagType'] === 'noother'){
                    console.log("Stopping")
                    return 0;
                }
                subSum = subSum + dataObj[i]['canContain'][j]['quantity'] + dataObj[i]['canContain'][j]['quantity'] * calculateTotalBags(dataObj[i]['canContain'][j]['bagType'])
            }
        }
    }
    return subSum;
})

howManyCanContain('shinygold')
console.log('How many bags can a shiny bag contain:', sum)