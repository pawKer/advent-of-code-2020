file = open("input2.txt", 'r')
lines = file.readlines()
countPwdRespectRule = 0

for l in lines:
    words = l.split(' ')
    pwdLengthRule = words[0]
    pwdMustContainLetter = words[1].replace(':', '')
    pwd = words[2].replace('\n', '')
    # print(pwdLengthRule, pwdLetterRule, pwd)
    pwdLengthRule = pwdLengthRule.split('-')
    pwdMin = int(pwdLengthRule[0]) - 1
    pwdMax = int(pwdLengthRule[1]) - 1
    
    isPwdValid = False
    if pwdMin < len(pwd) and pwdMin >= 0:
        if pwd[pwdMin] == pwdMustContainLetter:
            isPwdValid = True
    
    if pwdMax < len(pwd) and pwdMax >= 0:
        if pwd[pwdMax] == pwdMustContainLetter:
            if isPwdValid:
                isPwdValid = False
            else:
                isPwdValid = True


    if isPwdValid:
        countPwdRespectRule = countPwdRespectRule + 1

print(countPwdRespectRule)