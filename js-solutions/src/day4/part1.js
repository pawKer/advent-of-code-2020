import { getPassportsFromStringToArray } from '../utils/passports-to-array.js';
import { data, fieldData } from './input.js';

const dataArray = getPassportsFromStringToArray(data);
const validFields = fieldData;
const resetFields = () => {
    validFields.forEach((field) => {
        field.present = false;
        field.value = '';
    })
}
const isCurrentPassportValid = () => {
    for(let i = 0; i < validFields.length; i++) {
        if(validFields[i].present === false && !validFields[i].optional) {
            return false;
        }
    };
    return true;

}
let validPassports = 0;
for(let row = 0; row < dataArray.length; row++) {
    if (dataArray[row] === '') {
        if(isCurrentPassportValid()) {
            validPassports++;
        }
        resetFields();
        continue;
    }
    const fields = dataArray[row].split(' ');
    fields.forEach((field) => {
        const fieldTokens = field.split(':')
        const fieldName = fieldTokens[0]
        const fieldValue = fieldTokens[1]
        validFields.forEach((field) => {
            if (fieldName === field.name) {
                field.present = true;
                field.value = fieldValue
            }
        })
    })
    if (row === dataArray.length - 1) {
        if(isCurrentPassportValid()) {
            validPassports++;
        }
        resetFields();
    }
};
console.log(validPassports)