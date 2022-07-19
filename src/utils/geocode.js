
const request = require('request')

const geocode = (address,callback) => {
    //encodeURIComponent() to convert the special char
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieXNlcmEiLCJhIjoiY2w1aXVsYzZxMDd4ejNjcGY2MzFrajBxayJ9.an-rwFBrbKibrowxLYMgzA&limit=1'
    request({url, json:true},(error,{body})=>{ //Deconstructing the body from reponse
        if (error){
            callback('Unable to conncect to location services',undefined)
        } else if (body.features.length===0){
            callback('Unable to find location, please try another search',undefined)
        } else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode

// Address -> Lat/Long > Weather

// const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/Guigang.json?access_token=pk.eyJ1IjoieXNlcmEiLCJhIjoiY2w1aXVsYzZxMDd4ejNjcGY2MzFrajBxayJ9.an-rwFBrbKibrowxLYMgzA&limit=1'

// request({url: geocodeURL, json: true},(error,response)=>{

//     if (error) { //low level error
//         console.log('Unable to connect to location service!')
//     }   else if (!response.body.features) {
//         console.log ('Cannot for the Location, try another search')
//     }
//     else {
//         const latitude = response.body.features[0].center[1] // features is a list with len1
//         const longtitude = response.body.features[0].center[0]
//         console.log(latitude,longtitude)}
// })