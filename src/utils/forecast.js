const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=81f4a3c6dbee9229ca632fad3dfe717d&query="+encodeURIComponent(lat)+","+encodeURIComponent(long)+"&units=m";


request({url, json: true}, (error, {body})=> {
    if (error) {
        callback("unable to connect to weathr service", undefined)
    } else if (body.error) {
        callback(body.error.info, undefined)
    
    } else {
        callback(undefined, `${body.current.weather_descriptions} It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees outside, and the humedity is ${body.current.humidity}.`)
    }
})
}


module.exports = forecast