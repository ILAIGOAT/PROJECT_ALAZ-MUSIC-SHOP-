function UpdateCategoryLine(event){
    var targetElement = event.target;
    
    // Check if the target element is an <a> or inside an <a> (for nested elements like <i>)
    if (targetElement.tagName !== 'A') {
        targetElement = targetElement.closest('a');
    }

    // Get the innerHTML of the <a> element
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