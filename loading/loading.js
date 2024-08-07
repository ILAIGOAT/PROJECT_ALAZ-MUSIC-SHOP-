function redirect(){
    let time = Math.random() * (4 - 1) + 1;
    let timeout = setTimeout(category,time * 1000);
    
}
function category()
{
    if(sessionStorage.getItem('CategoryClicked') === 'Guitar/Bass')
        window.location.href = "../Instruments/Guitar_Bass.html";

    else if(sessionStorage.getItem('CategoryClicked') === 'Drums')
        window.location.href = "../Instruments/Drums.html";

    else if(sessionStorage.getItem('CategoryClicked') === 'Keys')
        window.location.href = "../Instruments/Keys.html";

    else if(sessionStorage.getItem('CategoryClicked') === 'Microphones')
        window.location.href = "../Instruments/Microphones.html";
    
    else if(sessionStorage.getItem('CategoryClicked') === 'Accessories')
        window.location.href = "../Instruments/Accessories.html";
    else
        window.location.href = "../HomePage/index.html";
}