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
        document.getElementById("inupbutton").style.display = "none"; 
    }
  
}


export function initializeUserStatus() 
{
    const state = sessionStorage.getItem('userConnected') === 'true';//change to session storage if there will be bugs 'Yanivs kinda idea'.
    ShowConnectedUser(state);
}


export function Logout()
{
    document.getElementById("open").href = "#";
    sessionStorage.setItem('userConnected' , 'false');//change to session storage if there will be bugs 'Yanivs kinda idea'.
    initializeUserStatus();
}