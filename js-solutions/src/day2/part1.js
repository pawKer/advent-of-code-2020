import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data } from './input1.js';

const dataArray = stringInputToArray(data);
const answer = dataArray.filter((password) => {
    const [lengthReq, letter, pwd] = password.split(' ');
    const [pwdMin, pwdMax] = lengthReq.split('-')
    const letterReq = letter.replace(':', '')

    let letterCountInPwd = 0;
    [...pwd].forEach((c) => {
        if (c === letterReq) {
            letterCountInPwd++;
        }
    })

    return letterCountInPwd >= pwdMin && letterCountInPwd <= pwdMax;
});

console.log(answer.length)
