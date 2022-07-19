// This is Client side JS which is going to run in the browser
// This is linked to the index.hbs
// Using the brower based API Fetch
// The fetch will just put the information to the console
// This is fetch the content in the URL to the user interface
// The views handlebar is the user interface, we need to present content in the HBS instead of console

const weatherForm = document.querySelector('form') // the form is the front end defined in index.hbs
const search = document.querySelector('input') // Select what the user have type in in the search

//use the # sign to target the ID
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From JavaScript'


// the eventlistener can track users' event like click, submit. 
weatherForm.addEventListener('submit',(event)=>{ // the function runs each time the event occurs
    event.preventDefault()
    const location = search.value
    
    messageOne.textContent='Loading'// Use the textContent method to decide what to show in the front end

    //Only fetch when there is a submit
    fetch('/weather?address='+location).then((response)=>{ //fetch to the client side JS
        response.json().then((data)=>{
            if (data.error){
                messageOne.textContent=data.error
            } else {
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }
        })
    })
})

// fetch('http://localhost:3000/weather?address=boston').then((response)=>{ //fetch to the client side JS
//     response.json().then((data)=>{
//         if (data.error){
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })
