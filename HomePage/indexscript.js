

// let IsSomeOneConnected = require('/SignInUp/mongodb.js');


/*function ShowConnectedUser()
{
  const isoc = "notConected";
  if(IsSomeOneConnected)
     isoc = "connected";

  document.getElementById("IfUserConnected").innerText = isoc;
  document.getElementById("IfUserConnected").style.display = "unset";
}
module.exports = ShowConnectedUser;*/


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








