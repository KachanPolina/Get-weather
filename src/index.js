'use strict';

let input = document.querySelector('#city-name');

const inputName = document.querySelector('#city-name');
const inputId = document.querySelector('#city-id');

const radioName = document.querySelector('#radio-city-name');
const radioId = document.querySelector('#radio-city-id');

function checkRadiobutton() {
	if (radioName.checked) {
		inputName.disabled = false;
		inputId.disabled = true;

		input = document.querySelector('#city-name');
	} else if (radioId.checked) {
		inputName.disabled = true;
		inputId.disabled = false;

		input = document.querySelector('#city-id');
	}
}

radioName.addEventListener('change', checkRadiobutton);
radioId.addEventListener('change', checkRadiobutton);

function getWeatherInfo(event) {
	event.preventDefault();

	const inputValue = input.value;
	// console.log(Number.parseInt(inputValue))
	// if (typeof Number.parseInt(inputValue) === 'number') {
	// 	console.log(`its number`);
	// } else {
	//     console.log('string')
	// }

	const param = {
		url: 'https://api.openweathermap.org/data/2.5',
		appid: '75c02277681f2e2438cfe8222088d2fd',
		cityName: 'Dnipro',
		cityId: 709930,
	};

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${param.appid}`,
	)
		.then((weatherInfo) => {
			// console.log(weatherInfo);
			if (!weatherInfo.ok) throw new Error('Error');
			return weatherInfo.json();
		})
		.then((city) => {
			console.log(city);
			const temperatureParagraph = document.querySelector(
				'#temperature-paragraph',
			);
			temperatureParagraph.textContent = `${city.main.temp} C`;

            const windSpeedParagraph = document.querySelector(
				'#wind-speed-paragraph',
			);
			windSpeedParagraph.textContent = `${city.wind.speed} m/s`;

            const humidityParagraph = document.querySelector(
				'#humidity-paragraph',
			);
			humidityParagraph.textContent = city.main.humidity;
		})
	// .catch((error) => {
	// 	console.log(error);
	// });
}

const weatherButton = document.querySelector('#weather-button');
weatherButton.addEventListener('click', getWeatherInfo);
