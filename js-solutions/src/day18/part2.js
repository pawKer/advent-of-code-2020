import { stringInputToArray } from "../utils/string-input-to-array.js";
import { data, testData } from "./input.js";

const readDataIntoArray = (data) => {
  let returnArray = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== " ") {
      returnArray.push(data[i]);
    }
  }
  return returnArray;
};

const getRPNForEquation = (ex) => {
  let output = [];
  let opstack = [];
  for (let i = 0; i < ex.length; i++) {
    if (ex[i] === "+" || ex[i] === "*") {
      while (
        opstack.length > 0 &&
        opstack[opstack.length - 1] !== "(" &&
        precedence[opstack[opstack.length - 1]] >= precedence[ex[i]]
      ) {
        output.push(opstack.pop());
      }
      opstack.push(ex[i]);
    } else if (ex[i] === "(") {
      opstack.push(ex[i]);
    } else if (ex[i] === ")") {
      while (opstack.length > 0 && opstack[opstack.length - 1] !== "(") {
        output.push(opstack.pop());
      }
      if (opstack[opstack.length - 1] === "(") {
        opstack.pop();
      }
    } else {
      output.push(parseInt(ex[i]));
    }
  }
  while (opstack.length > 0) {
    output.push(opstack.pop());
  }
  return output;
};

const calculateRPN = (rpnArray) => {
  let calcStack = [];
  for (const t of rpnArray) {
    const n = Number(t);
    if (!isNaN(n)) {
      calcStack.push(n);
    } else {
      if (calcStack.length < 2) {
        console.log("Error");
      }
      const o2 = calcStack.pop();
      const o1 = calcStack.pop();
      if (t === "+") {
        calcStack.push(o1 + o2);
      } else if (t === "*") {
        calcStack.push(o1 * o2);
      }
    }
  }
  return calcStack[0];
};

let dataArray = stringInputToArray(data);
let precedence = {
  "+": 2,
  "*": 1,
};

let sum = 0;
dataArray.forEach((row) => {
  let ex = readDataIntoArray(row);

  let output = getRPNForEquation(ex);

  console.log("RPN: ", output.join(""));

  sum += calculateRPN(output);
});
console.log("Final sum: ", sum);
