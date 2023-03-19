"use strict";

// ищем элементы
var status = document.querySelector('#status');
var btn = document.querySelector('.j-btn-test');
var xhr = new XMLHttpRequest(); // Функция, выводящая текст об ошибке

var error = function error() {
  status.textContent = 'Невозможно получить ваше местоположение';
}; // Функция, срабатывающая при успешном получении геолокации, определение широты и долготы


var success = function success(position) {
  console.log('position', position); // константа широты

  var latitude = position.coords.latitude; // константа долготы

  var longitude = position.coords.longitude; // cтрока запроса к API, который определяет широту и долготу

  var link = "https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=".concat(latitude, "&long=").concat(longitude);
  sendRequest(link);
}; // функция для работы со ссылкой


function sendRequest(link) {
  // настраиваем GET-запрос по URL
  xhr.open('GET', link); // отправляем запрос на сервер

  xhr.send();
} // обработчик клика


btn.addEventListener('click', function () {
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}); // функция, которая срабатывает после получения ответа от сервера

xhr.onload = function () {
  if (xhr.status != 200) {
    console.log('Статус ответа: ', xhr.status);
  } else {
    var data = JSON.parse(xhr.response);
    status.textContent = "\u0412\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u0437\u043E\u043D\u0430: ".concat(data.timezone, ", \u043C\u0435\u0441\u0442\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F: ").concat(data.date_time_txt);
  }
};