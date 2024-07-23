document.getElementById("open").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.add("active");
});
document.getElementById("dismiss-popup-btn").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.remove("active");
});
