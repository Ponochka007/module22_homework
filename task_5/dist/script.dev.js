"use strict";

// создаем константу со ссылкой на альтернативный эхо-сервер wss://echo-ws-service.herokuapp.com, так как wss://echo.websocket.org/ недоступен с 2021 года
var wss = "wss://echo-ws-service.herokuapp.com"; // ищем элементы

var input = document.querySelector('.input');
var btnSend = document.querySelector('.btn-send');
var btnGeo = document.querySelector('.btn-geo');
var userMessages = document.querySelector('.user-messages');
var serverMessages = document.querySelector('.server-messages');
var wrapperChat = document.querySelector('.wrapper-chat'); // выводит сообщения в чат

function writeToScreen(message) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flex-end';
  var element = "<p class='messages' style='align-self: ".concat(position, "'>").concat(message, "</p>");
  userMessages.innerHTML += element;
  wrapperChat.scrollTop = wrapperChat.scrollHeight;
} // объект соединения


var websocket = new WebSocket(wss);

websocket.onopen = function (evt) {
  console.log("CONNECTED");
};

websocket.onmessage = function (evt) {
  writeToScreen("\u043E\u0442\u0432\u0435\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430: ".concat(evt.data), 'flex-start');
};

websocket.onerror = function (evt) {
  writeToScreen("server: ".concat(evt.data), 'flex-start');
}; // отправка сообщения


btnSend.addEventListener('click', function () {
  var message = input.value;
  websocket.send(message);
  writeToScreen("\u0412\u044B: ".concat(message));
  input.value = '';
}); // функция, сообщающая об ошибке

var error = function error() {
  var textErr0r = 'Невозможно получить ваше местоположение';
  writeToScreen(textErr0r);
}; // функция, срабатывающая при успешном получении геолокации, определение широты и долготы


var success = function success(position) {
  // константа широты
  var latitude = position.coords.latitude; // константа долготы

  var longitude = position.coords.longitude; // cтрока запроса к API, который определяет широту и долготу

  var geoLink = "https://www.openstreetmap.org/#map=18/".concat(latitude, "/").concat(longitude);
  writeToScreen("<a href='".concat(geoLink, "' target='_blank'>\u0412\u0430\u0448\u0430 \u0433\u0435\u043E-\u043B\u043E\u043A\u0430\u0446\u0438\u044F</a>"));
}; // вешаем обработчик событий на кнопку "Гео-локация"


btnGeo.addEventListener('click', function () {
  // если геолокация не поддерживается, выводим сообщение
  if (!navigator.geolocation) {
    console.log('Geolocation не поддерживается вашим браузером');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}); // удаляем сообщения

serverMessages.addEventListener('click', function () {
  userMessages.innerHTML = " ";
});