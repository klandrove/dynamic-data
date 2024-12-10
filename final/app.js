// run the following commands in terminal:
// npm init
// npm install express
// npm install express-handlebars

//Initialize Express
const express = require('express')

const app = express()

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

const fs = require('fs');

const expressHandlebars = require('express-handlebars')

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main'
}))
app.set('view engine','handlebars')

const PORT = process.env.port || 3000

// set uo routes
app.get("/", (req,res)=>{
    const data = require('./data/home.json')
    res.render('homepage',{data})
})

app.get("/about", (req, res) => {
    const data = require('./data/about.json')
    res.render('about', data)
});

app.get("/table_decor", (req,res)=>{
    const data = require('./data/table_decor.json')
    res.render('category',{data})
})

app.get("/furniture", (req,res)=>{
    const data = require('./data/furniture.json')
    res.render('category',{data})
})

app.get("/kitchenware", (req,res)=>{
    const data = require('./data/kitchenware.json')
    res.render('category',{data})
})


// details page
app.get("/category/:category/details/:id", (req,res)=>{
    const cat = req.params.category;
    const data = require(`./data/${cat}.json`)
    // filter the data to get only the data that matches the id
    let currentProduct = data.products.find(product => product.id == req.params.id);
    let currentProductIndex = data.products.findIndex((product) => product.id == req.params.id);
    const suggestedProducts = [];
    for (let i = 1; i <= 4; i++) {
        let index = (currentProductIndex + i) % data.products.length;
        suggestedProducts.push(data.products[index]);
    }
    res.render('details', {
        "data": {
            currentProduct: currentProduct,
            suggestedProducts: suggestedProducts
        }
    });
})

let cart = {"products":[]}

let total = 0

app.get("/cart",(req,res) =>{
    if(typeof(req.query.id) != "undefined") {
        cart.products.push(req.query)
    } else {
    }

    total = cart.products.reduce((sum, product) => sum + parseFloat(product.price), 0);

    res.render('cart',{"products":cart.products, "total":total})
})

app.post("/cart/delete", (req, res) => {
    const productId = req.body.id
    cart.products = cart.products.filter(product => product.id !== productId)
    res.redirect('/cart')
});

app.get("/checkout", (req,res)=>{
    res.render('checkout', {
        data: {
            products: cart.products,
            total: total
        }
    });
})

app.post('/checkout/complete', (req, res) => {
    const { name, address, email, phone } = req.body;

    const order = {
        id: Date.now(),
        customer: {
            name: name,
            address: address,
            email: email,
            phone: phone
        },
        products: cart.products,
        total: total,
        date: new Date().toISOString()
    };
    fs.readFile('./data/orders.json', 'utf8', (err, data) => {
        if (err) {
            data = '[]';
        }
        const orders = JSON.parse(data);
        orders.push(order);

        fs.writeFile('./data/orders.json', JSON.stringify(orders, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error saving the order:', err);
                return res.status(500).send('Error saving your order.');
            }

            
            cart.products = [];

            res.render('thankyou', {
                name: order.customer.name,
                email: order.customer.email,
                products: order.products,
                total: order.total
            });
            
        });
    });
});



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