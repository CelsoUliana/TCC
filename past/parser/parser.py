''' 
Celso Antonio - August 2019 
'''

import csv
import json

my_json = {
    'type' : 'FeatureCollection',
    'features' : 
    [
        {
            'type' : 'Feature',
            'geometry' : 
            {
                'type' : 'Polygon',
                'coordinates' :
                [

                ]
            },
            'properties' : {
                
            }
        }
    ]
}

coordArray = []
 
with open('datasetnormalizado.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        a = float(row['Latitude'])
        b = float(row['Longitude'])
        coordArray.append([a , b])
''' my_json['features'].insert(0, obj feature)    '''
'''   Tipo des  obj features diferentes, polygon, polyline, line  '''
my_json['features'][0]['geometry']['coordinates'] = coordArray

with open('test.json', 'wb') as json_file:
    json.dump(my_json, json_file)