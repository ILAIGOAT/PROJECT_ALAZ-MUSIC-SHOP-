export function ShowConnectedUser(state)
{
    console.log("Calling ShowConnectedUser");
    const userStatusElement = document.getElementById("IfUserConnected");
    if (!userStatusElement) {
        console.error('Element with ID "IfUserConnected" not found.');
        return;
    }
    
    if(!state)
    {
        console.log("Element found but the state is false, setting innerHTML");
        userStatusElement.innerHTML = "Hello &#128400;";
        document.getElementById("inupbutton").style.display = "";
    }
        
    if(state) {
        userStatusElement.innerHTML = "Hello " + sessionStorage.getItem('ConnectedUsername') + "&#128400;";//change to session storage if there will be bugs 'Yanivs kinda idea'.
        console.log("Element found, setting innerHTML");
        document.getElementById("btn").src = sessionStorage.getItem('ConnectedUserimg');
        console.log("pfp changed in main");
        document.getElementById("inupbutton").style.display = "none"; 
    }
  
}


export function initializeUserStatus() 
{
    console.log("happened");
    const state = sessionStorage.getItem('userConnected') === 'true';//change to session storage if there will be bugs 'Yanivs kinda idea'.
    ShowConnectedUser(state);
}


export function Logout()
{
    document.getElementById("open").href = "#";
    document.getElementById("settings").href = "#";
    //sessionStorage.setItem('ConnectedUserimg',"https://roseanddaisyfoundation.org/media/images/large/pngkey.complaceholderpng3499617.png");
    document.getElementById("btn").src = "https://roseanddaisyfoundation.org/media/images/large/pngkey.complaceholderpng3499617.png"
    sessionStorage.setItem('userConnected' , 'false');//change to session storage if there will be bugs 'Yanivs kinda idea'.
    initializeUserStatus();
    location.reload();
}