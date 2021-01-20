const request = require('postman-request')

const getWeather = (lat, lon, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=b70ed20a5011d1cacc377cae7172f1eb&query=${lat},${lon}`

    request({ url, json: true}, (error, response) => {
        if (error) {
            return callback('Unable to connect to weather service.')
        } else if (response.body.error) {
            return callback('Location not found!')
        } else {
            callback(undefined, `Current tempetature: ${response.body.current.temperature}. It feels like: ${response.body.current.feelslike}. Current Forecast: ${response.body.current.weather_descriptions[0]}`)
        }
    })

}

module.exports = getWeather
