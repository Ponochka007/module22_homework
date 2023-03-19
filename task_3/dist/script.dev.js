"use strict";

// ищем элементы
var size = document.querySelector('#size');
var status = document.querySelector('#status');
var mapLink = document.querySelector('#map-link');
var btn = document.querySelector('.j-btn-test'); // Функция, выводящая текст об ошибке

var error = function error() {
  status.textContent = 'Информация о местоположении недоступна';
}; // Функция, срабатывающая при успешном получении геолокации


var success = function success(position) {
  // выводим на экран размеры экрана пользователя (ширина и высота)
  var width = window.screen.width;
  var height = window.screen.height;
  size.textContent = "\u0428\u0438\u0440\u0438\u043D\u0430 \u044D\u043A\u0440\u0430\u043D\u0430: ".concat(width, ", \u0432\u044B\u0441\u043E\u0442\u0430 \u044D\u043A\u0440\u0430\u043D\u0430: ").concat(height, "."); // выводим на экран координаты местонахождения пользователя

  console.log('position', position);
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  status.textContent = "\u0428\u0438\u0440\u043E\u0442\u0430: ".concat(latitude, " \xB0, \u0414\u043E\u043B\u0433\u043E\u0442\u0430: ").concat(longitude, " \xB0"); // бесплатные карты

  mapLink.href = "https://www.openstreetmap.org/#map=18/".concat(latitude, "/").concat(longitude);
  mapLink.textContent = 'Ссылка на карту';
}; // вешаем на кнопку обработчик клика


btn.addEventListener('click', function () {
  // зачищаем клик по геолокации
  mapLink.href = '';
  mapLink.textContent = ''; // проверяем поддержку геолокации

  if (!navigator.geolocation) {
    // если геолокация не поддерживается, выводим сообщение
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    // если геолокация поддерживается, добавляем в поле отпределение местопложения
    status.textContent = 'Определение местоположения…'; // единичничное обращение к геолокации

    navigator.geolocation.getCurrentPosition(success, error);
  }
});