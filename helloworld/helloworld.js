// Set up our server

// a few ways of declaring variables
var name = "John"
var age = 23.5
let lastName = "Smith"
const year = 2024

// JavaScript Object Notation AKA JSON printer.color
var printer = {
    color:"black",
    size:"small",
    price:29.99
}

// Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP)

const http = require('http')

// Define the port the app will access from
const PORT = process.env.PORT || 3000
// The HTTP module can create an HTTP server that listens to server

// the callback is a function which executes after something else has completed

// Use the createServer() method to create an HTTP server
const server = http.createServer((request, response) => {
    console.log("*******************************************")
    console.log("*******************************************")

    console.log(request.url)
    console.log(request.method) 
    // GET POST PUT DELETE
    // GET => READ OPERATION OF A DATABASE
    // POST => CREATE "" ""
    // PUT => UPDATE
    // DELETE => DELETE

    // How to respond to requests
    // ROUTING
    if(request.url == "/"){
        //execute the statement
        response.writeHead(200 , { "Content-Type" : "Text/Plain"})
        // response.sent is barely used because you have to end anyway
        // response.end both sends and ends
        // response.send("Home Page")
        response.end("Home Page")
    } 
    else if(request.url == "/contact"){
        //execute the statement
        response.writeHead(200 , { "Content-Type" : "Text/Plain"})
        response.end("Contact Page")
    }
    else if(request.url == "/about"){
        //execute the statement
        response.writeHead(200 , { "Content-Type" : "Text/Plain"})
        response.end("About Page")
    }
    else if(request.url == "/gallery"){
        //execute the statement
        response.writeHead(200 , { "Content-Type" : "Text/HTML"})
        response.end("<html><head><title>Page Title</title></head><body><h1>My first HTML response</h1></body></html>")
    } else {
        response.writeHead(400 , { "Content-Type" : "Text/Plain"})
        response.end("Page Not Found")
    }

    // Basic Conditions
    /*
    * Equals: if a == b (Equal sign twice because = by itself is assignment operator)
    * Not Equals: if a != b
    * Greater than: if a > b
    * Less than: if a < b
    * Greater than or equal: if a >= b
    * Less than or equal: if a <= b
    */

    console.log("Responding to request")

    console.log("*******************************************")
    console.log("*******************************************")
    
})

// Start the server
server.listen(PORT, () => console.log(`server started on port http://localhost:${PORT} press Ctrl + C to terminate.....`))