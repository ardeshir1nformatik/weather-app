const request = require('postman-request')
    

const getGeo = (address, callback) => {
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJkZXNoaXIiLCJhIjoiY2tqeTUxcXh1MDRnNjJubWVlZmZsdndlYiJ9.ACxa0LzNICWo7RiviGs-JQ&limit=1`
   
    request({ url, json: true}, (error, response) => {
        if (error) {
            return callback('Unable to connect to location services.')
        } else if (response.body.features.length === 0) {
            return callback('Unable to find location. Try another search!')
        } else {
            const lat = response.body.features[0].center[0]
            const lon = response.body.features[0].center[1]
            const location = response.body.features[0].place_name
    
            const data = {
                lat,
                lon,
                location
            }
    
            callback(undefined, data)
        }
    })
}

module.exports = getGeo