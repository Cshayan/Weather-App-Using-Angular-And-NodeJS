/*
 *  File to fetch the weather details
 */

// Dependencies
const express = require('express');
const router = express.Router();
const request = require('request');

/* POST /get-weather 
 * Purpose: Gets the weather info 
 */
router.post('/', (req, res) => {

    // Build the url to request for weather info
    /** GET http://api.openweathermap.org/data/2.5/weather **/
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${process.env.APPID}&units=metric`;

    // Request the url 
    request(url, (err, response, body) => {
        if (err) {
            return res.json({
                success: false,
                err: 'Cannot get the weather details! Please try again later.'
            })
        } else {
            // get the city latitude and longitude
            let weather = JSON.parse(body);
            if (weather.cod !== '404') {
                let latitude = weather.coord.lat;
                let longitude = weather.coord.lon;

                // Call darkSkyAPI
                let darkSkyURL = `https://api.darksky.net/forecast/${process.env.DAPPID}/${latitude},${longitude}?units=si&exclude=minutely,hourly`;
                request(darkSkyURL, (err, response, body) => {
                    if (err) {
                        return res.json({
                            success: false,
                            err: 'Cannot get the weather details! Please try again later.'
                        })
                    } else {
                        let weatherFromDarkSky = JSON.parse(body);
                        return res.json({
                            success: true,
                            msgFromDarkSkyAPI: weatherFromDarkSky,
                            msgFromOpenWeather: weather
                        });
                    }
                });
            } else {
                return res.json({
                    success: false,
                    err: 'Cannot get the weather details! Please try again later.'
                })
            }
        }
    });


});

// Export the router
module.exports = router;