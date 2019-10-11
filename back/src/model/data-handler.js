const path = require('path')
const constants = require('../constants')
const fs = require('fs')

const pathAreaDir = path.resolve(__dirname, './json/area/')
const pathAnimalDir = path.resolve(__dirname, './json/animal/')
const fileArea = 'area.json'

function replacer( key, value ) {

    let returned = null
        if ( value == value * 1 && value != ''){
            returned = Number(value)
        }else returned = value

        return returned
}

function writeFile (json, pathRequest) {
    //let thisPath = (pathRequest === constants.AREA_MODEL) ? pathAreaDir : pathAnimalDir
    let thisPath = pathAnimalDir
    let dataInJsonFormat = JSON.stringify(json, replacer, 1)
    fs.writeFileSync(path.join(thisPath, fileArea), dataInJsonFormat)    
}

exports.get = async (file, pathRequest, callback) => {
    let localData
    let thisPath = (pathRequest === constants.AREA_MODEL) ? pathAreaDir : pathAnimalDir
    
    fs.readFile(path.join(thisPath, file), (err, data) => {
        if (err) localData = {err: err.message}
        else localData = JSON.parse(data)   
                    
        callback(localData)     
    })
}

exports.listOfAllFeatures = (pathRequest) => {
    let thisPath = (pathRequest === constants.AREA_MODEL) ? pathAreaDir : pathAnimalDir
    let files = fs.readdirSync(thisPath)
    let filesExport = []

    files.forEach(file => {
        filesExport.push(file.toString().replace(".json", ""))
        console.log(file)
    })
    
    return filesExport
}


exports.write = writeFile