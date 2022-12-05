f = open("input.txt", "r")

elfs = []
sum_calories = 0

def separete_elfs(calories):
    if calories == '':
        elfs.append(globals()['sum_calories'])
        globals()['sum_calories'] = 0
        return
    
    globals()['sum_calories'] += int(calories)


for x in f:
  separete_elfs(x.replace('\n', ''))

elfs.sort()

print('resposta 1:', elfs[-1])
print('resposta 2:', elfs[-1] + elfs[-2] + elfs[-3])
