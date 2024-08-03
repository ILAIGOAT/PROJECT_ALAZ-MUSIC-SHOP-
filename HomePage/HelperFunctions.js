

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
        userStatusElement.innerHTML = "not connected";
    }
        
    if(state) {
        userStatusElement.innerHTML = "Hello " + localStorage.getItem('ConnectedUsername') + "!";
        console.log("Element found, setting innerHTML");
        localStorage.setItem('userConnected' , 'false');//change to session storage if there will be bugs 'Yanivs kinda idea'.
    }
  
}


export function initializeUserStatus() {
    const state = localStorage.getItem('userConnected') === 'true';//change to session storage if there will be bugs 'Yanivs kinda idea'.
    ShowConnectedUser(state);
}

export function Logout()
{
    localStorage.setItem('userConnected' , 'false');//change to session storage if there will be bugs 'Yanivs kinda idea'.
    initializeUserStatus();
}
