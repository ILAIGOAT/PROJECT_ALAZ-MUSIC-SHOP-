/* make all the varirables set from the html */
const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

/*functions*/
//swaps between login and register forms.
loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "#21264D"; //when the login button is clicked the background button changes to this color.
    registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";//basicaly swaps between the colors of the sign in and the sign up button on top//.

    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";

    loginForm.style.opacity = 1;

    registerForm.style.opacity = 0;

})

//swaps between login and register forms.
registerBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; //when the login button is clicked the background button changes to this color.
    registerBtn.style.backgroundColor = "#21264D";//basicaly swaps between the colors of the sign in and the sign up button on top//.

    loginForm.style.left = "150%";
    registerForm.style.left = "50%";

    loginForm.style.opacity = 0;

    registerForm.style.opacity = 1;

})









