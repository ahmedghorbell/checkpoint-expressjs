// Require express 
const express = require('express')

// Create instance 
const app = express()

  // Middleware body-parser
app.use(express.json())

// Middleware to check working hours
const checkWorkingHours = (req, res, next) => {
    const dayOfWeek = new Date().getDay();
    const hourOfDay = new Date().getHours();
    const isWorkingHour = dayOfWeek > 0 && dayOfWeek < 6 && hourOfDay >= 9 && hourOfDay < 17;
    
    if (!isWorkingHour) {
    res.status(404).send('This web application is only available during working hours Monday to Friday from 9h to 17h');
    } else {
    next();
    }
}

  // Middleware to check working hours
app.use(checkWorkingHours);

// Create PORT
const PORT = 5000;

// Create server 
app.listen(PORT, (error) => {
    error ? 
    console.log(error) : 
    console.log(`Server is running on PORT: ${PORT}`);
})

// Simple route test
app.get('/test', (req,res) => {
    res.send('hello world')
})

// Static DataBase 
let phones = [
    {
        name : 'apple',
        email : 'apple@yahoo.fr',
        id : 1
    },
    {
        name : 'samsung',
        email : 'samsung@yahoo.fr',
        id : 2
    },
    {
        name : 'oppo',
        email : 'oppo@yahoo.fr',
        id : 3
    },
]

// Get phones from database
app.get('/phones/get_phones', (req,res) => {
    res.status(200).send(phones)
})

// Add new phones 
app.post('/phones/add_phones', (req,res) => {
    const newPhone = req.body;
    phones = [...phones, newPhone];
    res.status(200).send({msg: 'phone added successfully' ,newPhone})
})

//View engine pug
app.set('view engine', 'pug')
app.set('views', './views')

app.get('/',(req,res) => {
    res.render('home')
})

app.get('/contact',(req,res) => {
    res.render('contact')
})

app.get('/services',(req,res) => {
    res.render('services')
})