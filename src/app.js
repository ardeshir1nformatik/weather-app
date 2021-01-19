const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeo = require('./utils/getGeo')
const getWeather = require('./utils/getWeather')

const app = express()

const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Ardeshir Tarkeshian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ardeshir Tarkeshian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ardeshir Tarkeshian',
        message: 'Welcome to the help page!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    getGeo(req.query.address, (error, { lat, lon, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        getWeather(lon, lat, (error,  weatherData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: weatherData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Ardeshir Tarkeshian',
        errorMessage: 'Article not found!'   
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Ardeshir Tarkeshian',
        errorMessage: 'Page not found!'   
    })
})

app.listen(port, () => {
    console.log(`Server is up on ${port}`)
})