
if(!(sessionStorage.getItem('userConnected') === 'true')){
  document.getElementById("open").href = "#";
  document.getElementById("settings").href = "#";
  document.getElementById("orders").href = "#";
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
}
else{
  document.getElementById("open").href = "../shopping cart/shoppingCart.html";
  document.getElementById("settings").href = "../Settings/Settings.html";
  document.getElementById("orders").href = "../Orders/orders.html";

}



function UpdateCategoryLine(event){
    var targetElement = event.target;
    

    if (targetElement.tagName !== 'A') {
        targetElement = targetElement.closest('a');
    }


    var innerHTML = targetElement.innerHTML;
    console.log(innerHTML);
    sessionStorage.setItem('CategoryClicked',innerHTML);
}