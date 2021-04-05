const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');

//requireing files
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Define Path For Express Config
const publicDirectoryPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'templates/views');
const partialPath = path.join(__dirname, 'templates/partials');

//Settng Up Template Engine Handlebars and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Serving Files Statically
app.use(express.static(publicDirectoryPath));

//Routes
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App'
	});
});

app.get('/weather', (req, res) => {
	const adress = req.query.adress;
	geocode(adress, (err, data) => {
		if (err) {
			return res.send({ error: err });
		}
		forecast(data.latitude, data.longitude, (err, data) => {
			if (err) {
				return res.send({ error: err });
			} else {
				res.send({
					tempertaure: data.tempertaure,
					feelsLike: data.feelsLike,
					windSpeed: data.windSpeed,
					cityName: data.cityName
				});
			}
		});
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		name: 'Mohamed Maher',
		title: 'Help'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Mohamed Maher'
	});
});

app.get('/about', (req, res) => {
	res.send('About Page');
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		error: 'Help Article'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		error: 'Page'
	});
});

app.listen(port);
