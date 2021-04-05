const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	messageOne.textContent = 'Loading....';
	messageTwo.textContent = '';
	fetch(`http://localhost:3000/weather?adress=${search.value}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = '';
				messageTwo.textContent = data.error;
			} else {
				messageOne.textContent = `Temp: ${data.tempertaure}C // Feels Like: ${data.feelsLike}C // Wind Speed: ${data.windSpeed} `;
				messageTwo.textContent = `City : ${data.cityName}`;
			}
		});
	});
});
