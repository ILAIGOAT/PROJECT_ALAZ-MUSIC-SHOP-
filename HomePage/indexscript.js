

function ShowConnectedUser(state)
{
  if(state)
    document.getElementById("IfUserConnected").innerText = "connected";
  
}


export {ShowConnectedUser};


document.getElementById("open").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.add("active");
});
document.getElementById("btn").addEventListener("click", function() {
  document.getElementsByClassName("popup")[0].classList.add("active");
});
document.getElementById("sidelist").addEventListener("click", function() {
  document.getElementsByClassName("popup")[0].classList.add("active");
});
document.getElementById("dismiss-popup-btn").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.remove("active");
    document.querySelector('.sidebar').classList.remove("active");
});








