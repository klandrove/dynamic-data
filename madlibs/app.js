//Initialize Express
const express = require('express')

// add the handlebars view engine
const expressHandlebars = require('express-handlebars')

const app = express()

// add body-parser to process POST data from forms
const bodyParser = require('body-parser')

// Body-parser needs to be initialized
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static('public'))

const handler = require('./lib/handler')

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main'
}))
app.set('view engine','handlebars')


const PORT = process.env.port || 8080
app.get("/", (request,response)=>{
    response.render('page',{request})
})

app.get("/mad", (request,response)=>{
    const data = require("./data/mad-data.json")
    response.render('madform',{data})
})

app.post('/process',(request,response)=>{
    response.send('got post')
    response.end()
})

app.get('/process',(request,response)=>{
    console.log(request.query)
})

app.get('/newsletter-signup', handler.newsletterSignup)

app.post('/newsletter-signup/process', handler.newsletterSignupProcess)

app.get('/newsletter/list', handler.newsletterSignupList)

app.get('/newsletter/thankyou', (request,response)=>{
    response.render('thankyou')
})

app.get('/newsletter/details/:email', handler.newsletterUser)
app.get('/newsletter/delete/:email', handler.newsletterUserDelete)

// Error handling -> app.use() basic express route
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