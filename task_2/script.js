const btn = document.querySelector('.j-btn-test');
const icon = document.querySelector('.bi-arrow-down-left-circle');
const icon2 = document.querySelector('.arrow-down-left-circle-fill');

btn.addEventListener('click', () => {
    isVisible = icon.style.display == 'block';
    isVisible2 = icon2.style.display == 'none';
    icon.style.display = isVisible ? 'none' : 'block';
    icon2.style.display = isVisible ? 'block' : 'none';
});