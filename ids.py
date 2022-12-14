
import json

d = {}
with open('ptg_data/ids.txt') as f :
    for line in f :
        name, id = line.split(',')
        d[id.rstrip()] = name

with open('ids.json', 'w+') as o :
    o.write(json.dumps(d))