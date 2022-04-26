const request = require('postman-request')


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGFuLWdtYWlsLWNvbSIsImEiOiJja3ZranRsZjE4eGFwMm9zN2p6bzMzdzNyIn0.AKtpy1gmQqVnlqD2JJ0EaQ&limit=1"
    request({url, json: true}, (error, { body }) =>{
        if (error) {
            callback( "Unable to connect to geocoding service", undefined)
        }
        else if(body.features.length === 0) {
             {
                callback("Unable to locate the location, Try anoother search", undefined)
            }

        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode