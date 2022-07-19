
const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('../../weather-app/utils/geocode')
const forecast = require('../../weather-app/utils/forecast')
const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs') //set the view engine
app.set('views',viewsPath) //set the views path
hbs.registerPartials(partialsPath) //set the patials path

//setup static directory to serve
app.use(express.static(publicDirectoryPath)) //static web page


app.get('',(req,res)=>{ //Dynamic Page
    res.render('index',{//render allow we rander one of handlebar template
        title: 'Weather app',
        name: 'Ysera Huang'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Ysera Huang'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{ //'help' must be in the views directory
        helpText:'This is some helpful text.',
        title:'Help',
        name:'Ysera Huang'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){ //req allow us to access the search term in URL
        return res.send({
            error: 'You must provide a location'})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error}) //send back a json
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                location:location,
                forecast: forecastData,
                address:req.query.address
            })
        })
    })
})


//Only for test
app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({ //return to avoid send twice
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Ysera Huang',
        errortext: 'Help article not found'
    })
})

app.get('*', (req,res)=>{//All route that haven been set up
    res.render('404',{
        title:'404',
        name: 'Ysera Huang',
        errortext: 'Page not found'
    })
})


app.listen(3000, ()=>{ //start the server and list it in port 3000.
    console.log('Server is up on port 3000.') // let me know the server is running
})



//app.com
//app.com/help
//app.com/about


// app.get('',(req,res)=>{ //req=request, res=response
//     res.send('<h1>weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>')
// })
