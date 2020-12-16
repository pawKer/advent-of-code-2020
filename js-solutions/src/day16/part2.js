import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data, testData2 } from './input.js';

let dataArray = stringInputToArray(data);

let rules = []
let myTicket;
let notValid = []
let adjacentTickets = []
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
                myTicket = row
            }
        } else if (currentSection === 2) {
            let tokens = row.split(',')
            let hasInvalidNumber = false;
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
                        hasInvalidNumber = true;
                        notValid.push(currentNumber)
                    }
                }

                if(!hasInvalidNumber) {
                    adjacentTickets.push(row)
                }
            }
        }
    } else {
        currentSection++;
    }
})


console.log('Remaining valid tickets (total about 240): ', adjacentTickets.length)

let m = [];

const initMatrix = () => {
    let splitTicket = adjacentTickets[0].split(',')
    for(let i = 0; i < splitTicket.length; i++) {
        let row = []
        for(let j = 0; j < rules.length; j++) {
            row.push(1)
        }
        m.push(row)
    }
}

const step = () => {
    for(let i = 0; i < rules.length; i++) {
        let count = 0;
        let index = -1;
        for(let j = 0; j < rules.length; j++) {
            if(m[i][j] === 1) {
                count++;
                index = j;
            }
        }
        if(count === 1) {
            for(let k = 0; k < rules.length; k++) {
                if(k !== i) {
                    m[k][index] = 0;
                }
            }
        }
    }

    for(let i = 0; i < rules.length; i++) {
        let count = 0;
        let index = -1;
        for(let j = 0; j < rules.length; j++) {
            if(m[j][i] === 1) {
                count++;
                index = j;
            }
        }
        if(count === 1) {
            for(let k = 0; k < rules.length; k++) {
                if(k !== i) {
                    m[index][k] = 0;
                }
            }
        }
    }
}

const isDone = () => {
    for(let i = 0; i < rules.length; i++) {
        let count = 0;
        for(let j = 0; j < rules.length; j++) {
            if(m[i][j] === 1) {
                count++;
            }
        }
        if(count > 1) {
            return false;
        }
    }
    return true;
}


initMatrix()

// For each number index check what rules don't work.
// We want to see if there are any number indices for which only a single rule can apply.
// If there is a number index such that only one rule can apply to that index across all tickets
// it means we have found our first field. We can then safely say that this rule only works for this number
// index so can mark that this rule won't apply for any of the other number indices in the matrix.
adjacentTickets.forEach(ticket => {
    let splitTicket = ticket.split(',')
    for(let i = 0; i < splitTicket.length; i++) {
        for(let j = 0; j < rules.length; j++) {
            let num = parseInt(splitTicket[i])
            if(!(num >= rules[j].rules[0].lowerLimit && num <= rules[j].rules[0].upperLimit)
               && !(num >= rules[j].rules[1].lowerLimit && num <= rules[j].rules[1].upperLimit)) {
                m[i][j] = 0;
            }
        }
    }
})

while(!isDone()) {
    step()
}

let ans = 1;
myTicket = myTicket.split(',')
for(let i = 0; i < 6; i++) {
    for(let j = 0; j < rules.length; j++) {
        if(m[j][i] === 1) {
            ans *= parseInt(myTicket[j])
        }
    }
}
console.log('Answer is: ', ans)