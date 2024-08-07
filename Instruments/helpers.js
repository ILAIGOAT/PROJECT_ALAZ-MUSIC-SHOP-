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



const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 1000;
priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);
        
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});
rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});
function refresh()
{
    document.getElementById(sessionStorage.getItem("lastCate")).innerHTML = "";
    receiveCateItems(sessionStorage.getItem("lastCate"));
}