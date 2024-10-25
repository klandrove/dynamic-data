// Sections descriptions:

// About: 1 short paragraph per page

// Services: show at least 4 services per page

// Packages: show at least 6 packages per page

// Gallery: show at least 16 images per page

// imports express into our project
const express = require('express')
// create the express server inside a variable called app
const app = express()
// Specify static routes
app.use(express.static('public'))
// import a package for handlebars
const expressHandlebars = require('express-handlebars')
// make express use the handlebars template engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main'
}))
app.set('view engine','handlebars')

const PORT = process.env.port || 3000
//Import app-wide data
const gallery = require("./data/gallery.json")
// Process routes
const data = require("./data/home-data.json")
app.get('/', (request,response)=> {
    response.render('landing', {
        gallery,
        data
    })
})
const history_data = require("./data/history-data.json")
app.get('/history', (request,response)=> {
    response.render('page',{
        gallery,
        data:history_data
    })
})
const art_data = require("./data/art-data.json")
app.get('/art', (request,response)=> {
    response.render('page',{
        gallery,
        data:art_data
    })
})
const nightlife_data = require("./data/nightlife-data.json")
app.get('/nightlife', (request,response)=> {
    response.render('page',{
        gallery,
        data:nightlife_data
    })
})
const adventure_data = require("./data/adventure-data.json")
app.get('/adventure', (request,response)=> {
    response.render('page',{
        gallery,
        data:adventure_data
    })
})

// NOT FOUND!
app.use((request,response)=>{
    response.status(404)
    response.render('404')
 } )

 // SERVER ERROR :(
 app.use((error,request,response,next)=>{
    console.log(error.message)
    response.status(500)
    response.render('500')
 })

 app.listen(PORT, ()=>{
    console.log(`Express is running on http://localhost:${PORT}`)
    console.log('Press ctrl-c to terminate')
 })