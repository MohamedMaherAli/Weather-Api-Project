const request = require('request');

const forecast = (lat, lon, callback) => {
	const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=27b56a5bd538d1cb67779938b5911c49&units=metric`;
	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connect to weather service', undefined);
		} else if (body.message) {
			callback('unable to find location', undefined);
		} else {
			callback(undefined, {
				tempertaure: body.main.temp,
				feelsLike: body.main.feels_like,
				windSpeed: body.wind.speed,
				cityName: body.name
			});
		}
	});
};

module.exports = forecast;
