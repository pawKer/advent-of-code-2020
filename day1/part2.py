f = open("adventInput.txt", "r")
f = f.readlines()
for x in f:
  for y in f:
    for z in f:
      if int(x) + int(y) + int(z)  == 2020:
	print(int(x)*int(y)*int(z))
