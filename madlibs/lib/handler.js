// Create a variable to store users that sign up
let eList = require('../data/emails.json')
// To write or create we need node's file system fs
const fs = require('fs')

// Create your functions
exports.newsletterSignup = (request,response) => {
    response.render('newsletter-signup', { csrf : 'supersecret'  })
}
exports.newsletterSignupProcess = (request,response) => {
    console.log(request.body)
    // To store the data:
    // First create a new user variable
    var newUser ={
        "firstname": request.body.firstname,
        "lastname": request.body.lastname,
        "address": request.body.address,
        "city": request.body.city,
        "state": request.body.state,
        "zip": request.body.zip,
        "email": request.body.email
    }

    console.log("cleanesd user")
    console.log(newUser)
    //Once we have a clean user, we add to the eList
    eList.users.push(newUser)
    // We need to turn the eList values back into text in order to write
    var json = JSON.stringify(eList)

    fs.writeFileSync('./data/emails.json',json, 'utf8', ()=>{
        console.log("finished writing file")
    })

    console.log("current eList")
    console.log(eList)
    //res.render('thankyou)
    response.redirect(303,'/newsletter/thankyou')
}

exports.newsletterSignupList = (request,response) => {
    console.log(eList)
    response.render('userspage', {"users": eList.users})
}

exports.newsletterUser = (request,response) => {
    var userDetails = eList.users.filter((user)=>{
        return user.email == request.params.email
    })

    response.render('userdetails', {"users": userDetails})
}

exports.newsletterUserDelete = (request,response) => {
    var newUsers = {"users":[]}
    
    newUsers.users = eList.users.filter((user)=>{
        return user.email != request.params.email
    })

    var json = JSON.stringify(newUsers)

    fs.writeFileSync('./data/emails.json',json, 'utf8', ()=>{
        console.log("finished writing file")
    })

    response.send('<a href="/newsletter/list">Go Back</a>')
}