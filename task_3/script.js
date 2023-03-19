// ищем элементы
const size = document.querySelector('#size');
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');

// Функция, выводящая текст об ошибке
const error = () => {
	status.textContent = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
	// выводим на экран размеры экрана пользователя (ширина и высота)
	const width = window.screen.width;
	const height = window.screen.height;
	size.textContent = `Ширина экрана: ${width}, высота экрана: ${height}.`;

	// выводим на экран координаты местонахождения пользователя
	console.log('position', position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
	// бесплатные карты
	mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	mapLink.textContent = 'Ссылка на карту';
}

// вешаем на кнопку обработчик клика
btn.addEventListener('click', () => {
	// зачищаем клик по геолокации
	mapLink.href = '';
	mapLink.textContent = '';

	// проверяем поддержку геолокации
	if (!navigator.geolocation) {
		// если геолокация не поддерживается, выводим сообщение
		status.textContent = 'Geolocation не поддерживается вашим браузером';
	} else {
		// если геолокация поддерживается, добавляем в поле отпределение местопложения
		status.textContent = 'Определение местоположения…';
		// единичничное обращение к геолокации
		navigator.geolocation.getCurrentPosition(success, error);
	}
});