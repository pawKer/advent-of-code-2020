import { luggageRulesToDataObject } from '../utils/luggage-rules-to-data-object.js';
import { data, testData } from './input.js';

const dataObj = luggageRulesToDataObject(testData);
let count = 0;
let canCurrentHold = false;
const howManyCanContain = ((bagTypeToCheck) => {
    dataObj.forEach((elem) => {
        console.log("Checking ", elem['bagType'], 'should check containing: ', elem['canContain'])
        if(elem['bagType'] === bagTypeToCheck) {
            console.log("Stopping")
            return;
        }
        elem['canContain'].forEach((elem) => {
            if(canCurrentHold) {
                return;
            }

            if(elem['bagType'] === 'noother'){
                console.log("Stopping")
                return;
            }
            if(elem['bagType'] === bagTypeToCheck){
                canCurrentHold = true;
                console.log('==== Can hold ', bagTypeToCheck)
                return;
            } else {
                canBagTypeContain(elem['bagType'], bagTypeToCheck)
            }
        })
        if(canCurrentHold){
            count++;
            canCurrentHold = false;
        }
    })
})

const canBagTypeContain = ((bagType, bagTypeToContain) => {
    dataObj.forEach((elem) => {
        if(elem['bagType'] === bagType) {
            console.log("\t Checking ", elem['bagType'])
            elem['canContain'].forEach((bag) => {
                if(bag['bagType'] === 'noother'){
                    console.log("stopping")
                    return;
                }
                if(bag['bagType'] === bagTypeToContain){
                    canCurrentHold = true;
                    console.log('==== Can hold ', bagTypeToContain)
                    return;
                } else {
                    canBagTypeContain(bag['bagType'], bagTypeToContain)
                }
            })
        }
    })
})

howManyCanContain('shinygold')
console.log('Bags that can contain at least a shiny bag:', count)