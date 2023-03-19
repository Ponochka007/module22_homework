// ищем элементы
const status = document.querySelector('#status');
const btn = document.querySelector('.j-btn-test');

let xhr = new XMLHttpRequest();

// Функция, выводящая текст об ошибке
const error = () => {
	status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации, определение широты и долготы
const success = (position) => {
	console.log('position', position);
	// константа широты
	const latitude = position.coords.latitude;
	// константа долготы
	const longitude = position.coords.longitude;

	// cтрока запроса к API, который определяет широту и долготу
	let link = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;
	sendRequest(link);
}

// функция для работы со ссылкой
function sendRequest(link) {
	// настраиваем GET-запрос по URL
	xhr.open('GET', link);
	// отправляем запрос на сервер
	xhr.send();
}
// обработчик клика
btn.addEventListener('click', () => {
	if (!navigator.geolocation) {
		status.textContent = 'Geolocation не поддерживается вашим браузером';
	} else {
		status.textContent = 'Определение местоположения…';
		navigator.geolocation.getCurrentPosition(success, error);
	}
});

// функция, которая срабатывает после получения ответа от сервера
xhr.onload = function () {
	if (xhr.status != 200) {
		console.log('Статус ответа: ', xhr.status);
	} else {
		let data = JSON.parse(xhr.response);
		status.textContent = `Временная зона: ${data.timezone}, местное время: ${data.date_time_txt}`;
	}
};