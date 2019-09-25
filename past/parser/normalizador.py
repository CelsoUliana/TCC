''' 
Celso Antonio - August 2019 
'''

import csv

data = list()

with open('dset.csv', newline='') as csvfile:
    data = list(csv.DictReader(csvfile))


data.sort(key = lambda x: x['ColarID'])


with open('datasetnormalizado.csv', newline='', mode='w') as csvfile:
    fieldnames = ['ID','AnimalID','AX','AY','AZ','MX','MY','MZ','GX','GY','GZ','DateTime','Latitude','Longitude','Vel Sobre Solo',
    'Aceleracao','Angulo','Distancia','DistanciaAcumulada','MaiorAceleracao','MaiorVelocidade','MediaAceleracao','MediaVelocidade',
    'MenorAceleracao','MenorVelocidade','PercentualParaTras','PercentualSemMovimento','TipoMovimento','Velocidade','PDOP','HDOP',
    'VDOP','Speed','Comportamento','Ano','Experimento','ColarID']
    csvwriter = csv.DictWriter(csvfile, fieldnames = fieldnames)
    csvwriter.writeheader()
    for obj in data:
        if(float(obj['Latitude']) != 0 and float(obj['Longitude']) != 0):
            csvwriter.writerow({'ID' : obj['ID'], 'AnimalID' : obj['AnimalID'], 'AX' : obj['AX'], 'AY': obj['AY'], 'AZ' : obj['AZ'],
            'MX' : obj['MX'], 'MY' : obj['MY'], 'MZ' : obj['MZ'], 'GX' : obj['GX'], 'GY' : obj['GY'], 'GZ' : obj['GZ'], 'DateTime' : obj['DateTime'],
            'Latitude' : obj['Latitude'] ,'Longitude' : obj['Longitude'],'Vel Sobre Solo' : obj['Vel Sobre Solo'],
            'Aceleracao' : obj['Aceleracao'], 'Angulo' : obj['Angulo'], 'Distancia' : obj['Distancia'], 'DistanciaAcumulada' : obj['DistanciaAcumulada'],
            'MaiorAceleracao' : obj['MaiorAceleracao'], 'MaiorVelocidade' : obj['MaiorVelocidade'], 'MediaAceleracao' : obj['MediaAceleracao'],
            'MediaVelocidade' : obj['MediaVelocidade'], 'MenorAceleracao' : obj['MenorAceleracao'], 'MenorVelocidade' : obj['MenorVelocidade'],
            'PercentualParaTras' : obj['PercentualParaTras'], 'PercentualSemMovimento' : obj['PercentualSemMovimento'], 'TipoMovimento' : obj['TipoMovimento'],
            'Velocidade' : obj['Velocidade'], 'PDOP' : obj['PDOP'], 'HDOP' : obj['HDOP'], 'VDOP' : obj['VDOP'], 'Speed' : obj['Speed'],
            'Comportamento' : obj['Comportamento'], 'Ano' : obj['Ano'], 'Experimento' : obj['Experimento'], 'ColarID' : obj['ColarID']})
    