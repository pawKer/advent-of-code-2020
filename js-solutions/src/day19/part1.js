import { stringInputToArray } from "../utils/string-input-to-array.js";
import {
  testRules,
  testMessages,
  actualRules,
  actualMessages,
} from "./input.js";

const readDataIntoDict = (data) => {
  let ruleSet = [];
  for (let row of data) {
    let splitRow = row.split(":");
    let ruleNo = splitRow[0];
    let rule = splitRow[1].trim();
    if (rule === '"a"') {
      ruleSet[parseInt(ruleNo)] = {
        rule: "a",
        calculated: true,
      };
    } else if (rule === '"b"') {
      ruleSet[parseInt(ruleNo)] = {
        rule: "b",
        calculated: true,
      };
    } else {
      if (rule.includes("|")) {
        rule = rule.split("|");
      }
      let ruleAsArray = [];
      if (Array.isArray(rule)) {
        for (let el of rule) {
          let trimmed = el.trim();
          ruleAsArray.push(trimmed.split(" "));
        }
      } else {
        ruleAsArray.push(rule.split(" "));
      }
      ruleSet[parseInt(ruleNo)] = {
        rule: ruleAsArray,
        calculated: false,
      };
    }
  }
  return ruleSet;
};

const calculateRule = (ruleNo) => {
  let ruleOptions = ruleSet[ruleNo].rule;
  if (
    ruleSet[ruleNo].calculated ||
    ruleOptions === "a" ||
    ruleOptions === "b"
  ) {
    return ruleOptions;
  }
  let calc = [];
  for (let option of ruleOptions) {
    let strOps = [];
    for (let rule of option) {
      let ruleToCalc = parseInt(rule);
      console.log(ruleToCalc);
      let res = calculateRule(ruleToCalc);
      if (strOps.length === 0) {
        if (Array.isArray(res)) {
          strOps = strOps.concat(res);
        } else {
          strOps.push(res);
        }
      } else {
        let combined = [];
        for (let s of res) {
          for (let op of strOps) {
            combined.push(op + s);
          }
        }
        strOps = combined;
      }
    }
    calc = calc.concat(strOps);
  }
  ruleSet[ruleNo].rule = calc;
  ruleSet[ruleNo].calculated = true;
  console.log(calc);
  return calc;
};

let data = stringInputToArray(actualRules);
let possibleMessages = stringInputToArray(actualMessages);
let ruleSet = readDataIntoDict(data);

let output = calculateRule(0);

console.log("All solutions", output);
let allSolutions = output;

let finalCount = 0;
for (let msg of possibleMessages) {
  if (allSolutions.includes(msg)) {
    finalCount++;
  }
}

console.log("Final count is: ", finalCount);
