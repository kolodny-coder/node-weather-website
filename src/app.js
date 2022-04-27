const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { SocketAddress } = require('net')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = (path.join(__dirname, '../templates/views'))
const partialsPath = (path.join(__dirname, '../templates/partials'))

// Setup handelbars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory configuration 
app.use(express.static(publicDirectoryPath ))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'dan kolodny'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'dan kolodny'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
    helpText: 'Need some help',
    title: 'Help',
    name: 'Dan Kolodny'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'You must provide address term'})
    }
    if (res.error) {
        return res.send({error: 'err'})
    }
    const location = req.query.address


    geocode(location, (error, {longtitude, latitude, location} = {})=> {
        if (!location) {
            return console.log("Please add a valid location");
        }
        
        if (error) {
            return console.log(error);
        }
        console.log(longtitude)
        console.log(latitude)
        
        forecast( latitude, longtitude, (error, forcastData) => {
            if (error) {
                res.send({error})
            }
            console.log(location)
            console.log(forcastData)

            res.send({
                location: location,
                forecast: forcastData,
                address: req.query.address
        
            })


          })

          


    })

    
}) 

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Dan Kolodny',
        errorMsg: 'Help page was not found'
    })
})

app.get('/index/*', (req, res) =>{
    res.render('404',{
        errorMsg: 'Error 404 something went wrong'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please provide search term'
        })

    }
    console.log(req.query.search);
    res.send({
        products: []
    })
 

})
    


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dan Kolodny',
        errorMsg: 'Page was not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})