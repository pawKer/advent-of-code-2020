file = open("input.txt", 'r')
lines = file.readlines()
countPwdRespectRule = 0

for l in lines:
    words = l.split(' ')
    pwdLengthRule = words[0]
    pwdMustContainLetter = words[1].replace(':', '')
    pwd = words[2].replace('\n', '')
    # print(pwdLengthRule, pwdLetterRule, pwd)
    pwdLengthRule = pwdLengthRule.split('-')
    pwdMin = int(pwdLengthRule[0])
    pwdMax = int(pwdLengthRule[1])
    letterCountInPwd = 0
    for c in pwd:
        if c == pwdMustContainLetter:
            letterCountInPwd = letterCountInPwd + 1

    if letterCountInPwd <= pwdMax and letterCountInPwd >= pwdMin:
        countPwdRespectRule = countPwdRespectRule + 1

print(countPwdRespectRule)