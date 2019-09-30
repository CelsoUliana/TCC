import csv
import json

my_json = {
    'type' : 'FeatureCollection',
    'features' : 
    [

    ]
}

coordArray = {}
 
with open('../model/csv/datasetnormalizado.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        key = str(row['AnimalID']) + str(row['Ano']) + str(row['ID'])
        a = float(row['Latitude'])
        b = float(row['Longitude'])
        if not key in coordArray.keys():
            coordArray[key] = {
                'type' : 'Feature',
                'geometry' : 
                {
                    'type' : 'LineString',
                    'coordinates' :
                    [

                    ]
                },
                'properties' : {
                    'ID' : row['ID'],
                    'Ano' : row['Ano'],
                    'animalID' : row['AnimalID'],
                }
            }
            coordArray[key]['geometry']['coordinates'].append([b , a])
        else:
            coordArray[key]['geometry']['coordinates'].append([b , a])

''' my_json['features'].insert(0, obj feature)    '''
'''   Tipo des  obj features diferentes, polygon, polyline, line  '''
#my_json['features'][0]['geometry']['coordinates'] = coordArray

for keys in coordArray:
    my_json['features'].append(coordArray[keys])
    #print(coordArray[keys])

with open('../model/json/animal/test.json', 'w') as json_file:
    json.dump(my_json, json_file)