// a few ways of declaring variables
var name = "John"
var age = 23.5
let lastName = "Smith"
const year = 2024
// JavaScript Object Notation AKA JSON
var printer = {
    color:"black",
    size:"small",
    price:29.99
}

const http = require('http')

// Define the port the app will access from
const PORT = process.env.PORT || 3000

// Use the createServer() method to create an HTTP server
const server = http.createServer((request, response) => {
    console.log(request)
    response.writeHead(200 ,{ 'Content-Type':'text/plain'})
    response.end('Hello World')
})

// Start the server
server.listen(PORT, () => console.log(`server started on port ${PORT} press Ctrl-C to terminate.....`))