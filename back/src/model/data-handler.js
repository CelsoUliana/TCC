const path = require('path')
const pathAreaDir = path.resolve(__dirname, './json/area/')
const pathAnimalDir = path.resolve(__dirname, './json/animal/')
const constants = require('../constants')
const fileArea = 'area.json'
const fs = require('fs')

function replacer( key, value ) {

    let returned = null
        if ( value == value * 1 && value != ''){
            returned = Number(value)
        }else returned = value

        return returned
}

function writeFile (json, pathRequest) {
    if (pathRequest === constants.ANIMAL_MODEL) {
        // TODO YET
    } 
    if (pathRequest === constants.AREA_MODEL) {
        let dataInJsonFormat = JSON.stringify(json, replacer, 1)
        fs.writeFileSync(path.join(pathAnimalDir, fileArea), dataInJsonFormat)
    }
}

exports.get = async (file, pathRequest, method) => {
    let localData
    let thisPath = pathRequest === constants.AREA_MODEL ? pathAreaDir : pathAnimalDir
    
    fs.readFile(path.join(thisPath, file), (err, data) => {
        if (err) localData = {err: err.message}
        else localData = JSON.parse(data)   
                    
        method(localData)     
    })
}

exports.listOfAllFeatures = (pathRequest) => {
    let thisPath = pathRequest === constants.AREA_MODEL ? pathAreaDir : pathAnimalDir
    let files = fs.readdirSync(thisPath)
    let filesExport = []

    files.forEach(file => {
        filesExport.push(file.toString().replace(".json", ""))
        console.log(file)
    })
    
    return filesExport
}


exports.write = writeFile