const request = require('request');

const geocode = (adress, callback) => {
	adress = encodeURIComponent(adress);
	const url = `
    https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoiY2xpbmt6MDE2IiwiYSI6ImNrbXQ5bnMxaDBwbzgycHFnYjlqcDlxbGYifQ.B_5uRK13xzPs9OYc5gLWOg`;

	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('No Connection services', undefined);
		} else if (body.features.length === 0) {
			callback('Location you are searching for is not found', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
