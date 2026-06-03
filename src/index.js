'use strict';

let cityInput = document.querySelector('#city-name');
let searchParametry = 'q';

const radioName = document.querySelector('#radio-city-name');
const radioId = document.querySelector('#radio-city-id');

function checkRadiobutton() {
	const inputName = document.querySelector('#city-name');
	const inputId = document.querySelector('#city-id');

	if (radioName.checked) {
		inputName.disabled = false;
		inputId.disabled = true;

		cityInput = document.querySelector('#city-name');
		searchParametry = 'q';

		inputId.classList.add('disable-input');
		inputName.classList.remove('disable-input');
	} else if (radioId.checked) {
		inputName.disabled = true;
		inputId.disabled = false;

		cityInput = document.querySelector('#city-id');
		searchParametry = 'id';

		inputName.classList.add('disable-input');
		inputId.classList.remove('disable-input')
	}
}

function getWeatherInfo(event) {
	event.preventDefault();

	const existingError = document.querySelector('.error-message');
  	if (existingError) {
    	existingError.remove();
  	}

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?${searchParametry}=${cityInput.value}&units=metric&appid=75c02277681f2e2438cfe8222088d2fd`)
		.then((weatherInfo) => {
			if (!weatherInfo.ok) throw new Error('Cannot get information about entered city');
			return weatherInfo.json();
		})
		.then((city) => {
			console.log(city);
			const temperatureParagraph = document.querySelector('#temperature-paragraph');
			temperatureParagraph.textContent = `${city.main.temp} C`;

			const windSpeedParagraph = document.querySelector('#wind-speed-paragraph');
			windSpeedParagraph.textContent = `${city.wind.speed} m/s`;

			const humidityParagraph = document.querySelector('#humidity-paragraph');
			humidityParagraph.textContent = city.main.humidity;
		})
		.catch((error) => {
			console.error(error.message);

			if (!document.querySelector('.error-message')) {
				const errorMessage = document.createElement('p');
				errorMessage.classList.add('error-message');
				errorMessage.textContent = "Cannot get information about entered city. Try to enter again!";
				document.querySelector('form').insertBefore(errorMessage, document.querySelector('.btn-container')); 
			}
		});
}

function clearForm(event) {
	event.preventDefault();

	const paragraphs = document.querySelectorAll('p[id]');
	paragraphs.forEach((p) => {
		p.textContent = '';
	});

	const inputs = document.querySelectorAll('input[type="text"]');
	inputs.forEach((input) => {
		input.value = '';
	});
}

radioName.addEventListener('change', checkRadiobutton);
radioId.addEventListener('change', checkRadiobutton);

const weatherButton = document.querySelector('#weather-button');
weatherButton.addEventListener('click', getWeatherInfo);

const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', clearForm);
