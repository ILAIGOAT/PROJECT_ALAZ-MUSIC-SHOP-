document.getElementById("open").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.add("active");
});
document.getElementById("dismiss-popup-btn").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.remove("active");
});




function ChangeBackground()
{

  if(document.body.style.background = "#212121")
  {
      document.body.style.background = "#e8e8e8";
      document.body.style.color = "#42424A";
  }

  
    

}

