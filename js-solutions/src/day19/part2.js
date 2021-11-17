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
  return calc;
};

let data = stringInputToArray(actualRules);
let possibleMessages = stringInputToArray(actualMessages);
let ruleSet = readDataIntoDict(data);

calculateRule(0);

let finalCount = 0;
let all42s = ruleSet[42].rule;
let all31s = ruleSet[31].rule;
let chunkSize = all42s[0].length;

for (let msg of possibleMessages) {
  let count42 = 0;
  let count31 = 0;
  let starts42 = false;
  let ends31 = false;
  let saw31 = false;
  let valid = true;

  // Determine if message starts with a 42 chunk , ends with a 31 chunk
  // and the order is strictly 42 chunks followed by 31 chunks
  for (let i = 0; i < msg.length; i += chunkSize) {
    let chunk = msg.substring(i, i + chunkSize);

    if (all42s.includes(chunk)) {
      if (saw31) {
        valid = false;
      }
      if (i === 0) {
        starts42 = true;
      }
      count42++;
    }
    if (all31s.includes(chunk)) {
      saw31 = true;
      if (i + chunkSize === msg.length) {
        ends31 = true;
      }
      count31++;
    }
  }

  if (valid && starts42 && ends31 && count42 > count31) {
    finalCount++;
  }
}

console.log("Final count is: ", finalCount);
