import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData } from './input.js';

let dataArray = stringInputToArray(data);

let rules = []
let myTicket = []
let currentTicket = []
let notValid = []
let currentSection = 0;

dataArray.forEach(row => {
    if(row !== '') {
        if(currentSection === 0) {
            let tokens = row.split(':')
            let ruleTokens = tokens[1].split(' ')
            let field = {
                'type': tokens[0],
                'rules': [
                    {
                        'lowerLimit': parseInt(ruleTokens[1].split('-')[0]),
                        'upperLimit': parseInt(ruleTokens[1].split('-')[1])
                    },
                    {
                        'lowerLimit': parseInt(ruleTokens[3].split('-')[0]),
                        'upperLimit': parseInt(ruleTokens[3].split('-')[1])
                    }
                ]
            }
            rules.push(field)
        } else if (currentSection === 1) {
            let tokens = row.split(',')
            if(tokens.length > 1) {
                tokens.forEach(token => {
                    myTicket.push(parseInt(token))
                })
            }
        } else if (currentSection === 2) {
            let tokens = row.split(',')
            if(tokens.length > 1) {
                for(let i = 0; i < tokens.length; i++) {
                    let currentNumber = parseInt(tokens[i])
                    let validForSomeField = false;
                    rules.forEach(field => {
                        field.rules.forEach(rule => {
                            if(currentNumber >= rule.lowerLimit && currentNumber <= rule.upperLimit) {
                                validForSomeField = true;
                            }
                        })
                    })
                    if(!validForSomeField) {
                        notValid.push(currentNumber)
                    }
                }
            }
        }
    } else {
        currentSection++;
    }
})

const calculateErrorRate = (array) => {
    let sum = 0
    array.forEach(item => {
        sum += item;
    })
    return sum;
}

console.log(notValid)
console.log('Error rate: ', calculateErrorRate(notValid))