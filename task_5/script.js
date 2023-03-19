// создаем константу со ссылкой на альтернативный эхо-сервер wss://echo-ws-service.herokuapp.com, так как wss://echo.websocket.org/ недоступен с 2021 года
const wss = "wss://echo-ws-service.herokuapp.com";


// ищем элементы
const input = document.querySelector('.input');
const btnSend = document.querySelector('.btn-send');
const btnGeo = document.querySelector('.btn-geo');
const userMessages = document.querySelector('.user-messages');
const serverMessages = document.querySelector('.server-messages');
const wrapperChat = document.querySelector('.wrapper-chat');


// выводит сообщения в чат
function writeToScreen(message, position = 'flex-end') {
	let element = `<p class='messages' style='align-self: ${position}'>${message}</p>`;
	userMessages.innerHTML += element;
	wrapperChat.scrollTop = wrapperChat.scrollHeight;
}


// объект соединения
let websocket = new WebSocket(wss);
websocket.onopen = function (evt) {
	console.log("CONNECTED");
};
websocket.onmessage = function (evt) {
	writeToScreen(`ответ сервера: ${evt.data}`, 'flex-start');
};
websocket.onerror = function (evt) {
	writeToScreen(`server: ${evt.data}`, 'flex-start');
};


// отправка сообщения
btnSend.addEventListener('click', () => {
	let message = input.value;
	websocket.send(message);
	writeToScreen(`Вы: ${message}`);
	input.value = ''
});


// функция, сообщающая об ошибке
const error = () => {
	let textErr0r = 'Невозможно получить ваше местоположение';
	writeToScreen(textErr0r);
};


// функция, срабатывающая при успешном получении геолокации, определение широты и долготы
const success = (position) => {
	// константа широты
	let latitude = position.coords.latitude;
	// константа долготы
	let longitude = position.coords.longitude;
	// cтрока запроса к API, который определяет широту и долготу
	let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	writeToScreen(`<a href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
};


// вешаем обработчик событий на кнопку "Гео-локация"
btnGeo.addEventListener('click', () => {
	// если геолокация не поддерживается, выводим сообщение
	if (!navigator.geolocation) {
		console.log('Geolocation не поддерживается вашим браузером');
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
	}
});


// удаляем сообщения
serverMessages.addEventListener('click', () => {
	userMessages.innerHTML = " ";
});