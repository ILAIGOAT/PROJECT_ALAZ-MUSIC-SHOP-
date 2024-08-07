function UpdateCategoryLine(event){
    var targetElement = event.target;
    
    if (targetElement.tagName !== 'A') {
        targetElement = targetElement.closest('a');
    }

    var innerHTML = targetElement.innerHTML;
    console.log(innerHTML);
    sessionStorage.setItem('CategoryClicked',innerHTML);
}

function IfShoppingCartUseable()
{
    if(sessionStorage.getItem('userConnected') === 'true')
        document.getElementById("open").href = "/shopping cart/shoppingCart.html";
    else
        document.getElementById("open").href = "/SignInUp/SignInUp.html";
}