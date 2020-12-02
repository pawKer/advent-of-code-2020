import { stringInputToArray } from '../utils/string-input-to-array.js';
import { data } from './input2.js';

const dataArray = stringInputToArray(data);
const answer = dataArray.filter((password) => {
    const [lengthReq, letter, pwd] = password.split(' ');
    let [pwdMin, pwdMax] = lengthReq.split('-')
    pwdMin--;
    pwdMax--;
    const letterReq = letter.replace(':', '')

    let isPwdValid = false

    if (pwdMin < pwd.length && pwdMin >= 0) {
        if (pwd[pwdMin] == letterReq) {
            isPwdValid = true
        }
    }
    if (pwdMax < pwd.length && pwdMax >= 0) {
        if (pwd[pwdMax] === letterReq) {
            if (isPwdValid) {
                isPwdValid = false
            }
            else {
                isPwdValid = true
            }
        }
    }

    return isPwdValid;
});

console.log(answer.length)
