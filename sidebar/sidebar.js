let button = document.querySelector('btn');
let sidebar = document.querySelector('.sidebar');

button.onclick = function () {
    sidebar.classList.toggle('active');
};