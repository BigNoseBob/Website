

num_sheets = 9
scores = {}

name_set = {'Marco Andrade', 'James', 'Jack', 'Bert', 'Xavier', 'Seb', 'Matt', 'Amogh', 'Eric', 'Juan', 'Yonas', 'Evan', 'Nick', 'Donny', 'Trace', 'Marco Arias', 'Manwaring', 'Robbie', 'LeBlanc', 'Tyler', 'Stephen', 'Finman', 'Josh', 'Hez', 'Aaron', 'Fritz', 'Gupreet', 'Sawyer', 'Jayden', 'Hungy', 'Franklin', 'Isaiah', 'Lleyton', 'Carlson', 'Justin', 'Alan', 'Miles KT', 'Mark', 'Peter', 'Wang', 'Migo', 'Ollie', 'Max', 'Milo', 'Gabo', 'Sasha', 'Xander', 'John', 'Aidan', 'Clay', 'Isaac', 'Roper', 'Spears', 'Naya', 'Tommy'}

for data_num in range(num_sheets) :
    with open('ptg_data/%s.txt' % (data_num + 1)) as f :
        
        i = 0
        for line in f :
            names = line.split(',')
            names = [ _.rstrip().strip() for _ in names if _ != '\n' and len(_) != 0 ]
            
            for name in names :

                if name not in name_set :
                    print(name, data_num + 1)
                    breakpoint()
                
                if name in scores :
                    scores[name] += [7 - i]
                else :
                    scores[name] = [7 - i]
            i += 1


for n,s in scores.items() :
    if len(s) < num_sheets :
        print(n)

print(scores)

import json
j = json.dumps(scores)
with open('scores.json', 'w+') as outfile :
    outfile.write(j)