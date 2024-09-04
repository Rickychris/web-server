const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getForcast = require('./utils/getForcast');
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chris'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Chris'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a helpful message',
        name: 'Chris'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    getForcast(req.query.address, (error, { description, temperature, feelslike, location}={}) => {
        if (error) {
            return res.send({ error })
        }
        return res.send({
            forecast: `${description}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees in ${location}.`,
            location: req.query.address,
            address: req.query.address
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chris',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chris',
        errorMessage: 'Page not found'
    });
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})