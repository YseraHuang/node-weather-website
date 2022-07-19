const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    url='http://api.weatherstack.com/current?access_key=ad7bf2d5c78b67ae5eb572d57f9f691c&query=' + latitude + ',' + longitude + '&units=f'

    request({url:url, json:true},(error,{body}) =>{
        if (error){
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find the location.',undefined)
        } else{
            
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degree out. '
            + 'It feels like ' + body.current.feelslike+' degrees out.')
        }
    })

}

module.exports=forecast

// // Use weatherstack API
//const url1='http://api.weatherstack.com/current?access_key=ad7bf2d5c78b67ae5eb572d57f9f691c&query=32.2342,33.4234&units=f'
// //we can all modify the url using & to get more option (Changing the measurement of temperature)


// request({url: url1, json: true},(error,response)=>{ //request from the URL
//     //const data=JSON.parse(response.body) // Parse the JSON
//     //console.log(data.current)

//     if (error) { // When there is no internet
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error){ // 'error' is not a self defined variable name
//         console.log('Unable to find the location')
//     }
    
//     else{
//         console.log(response.body.current.weather_descriptions[0]+'. It is currently '+response.body.current.temperature+' degree out. '
//     + 'It feels like ' + response.body.current.feelslike+' degrees out.')}

// })