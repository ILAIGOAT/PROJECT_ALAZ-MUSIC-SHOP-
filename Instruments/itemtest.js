
function additem(name,price,img,color,id,addTo,Index){
    let HTMLtoAdd = '<div class=\"container\"><div class=\"item\"><div class=\"item-image\"><img src=\"'+ img +'" alt=\"Item Image\"></div><div class=\"item-details\"><div><p>'+name+'</p></div><div></div><div class=\"color-option\"><span class=\"color\"></span><div class=\"circles\"></div></div><div class=\"quantity\"><button class=\"plus-btn\" type=\"button\" name=\"button\" id=\"plus-btn\" onclick=\"IncreamentQuantity('+ Index +')\"><img src=\"../shopping cart/plus-lg.svg\" alt=\"\"></button><input type=\"text\" id=\"quanumber'+ Index +'\" name=\"name\" value=\"1\" min=\"1\"><button class=\"minus-btn\" type=\"button\" name=\"button\" id=\"minus-btn\" onclick=\"DecreamentQuantity('+ Index +')\"><img src=\"../shopping cart/dash.svg\" alt=\"\"></button></div><div class=\"item-price\"><input id=\"price' + Index +'\" type=\"hidden\" value=\"'+ price +'\"><p id=\"updatedprice'+ Index +'\">₪' + price +  '</p></div><button class=\"add-to-cart-btn\" data-id="'+ id +'"onclick=\"addToCart(event,'+Index+')\">Add to Cart</button></div></div></div>'
    addTo.insertAdjacentHTML('beforeend',  HTMLtoAdd);
}



function receiveCartItems(Category) {
    console.log("Sending get category items request");
    // Use a specific container instead of event.target
    let targetContainer = document.getElementById(Category);

    fetch('http://localhost:88/item/getCategoryItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Category })
    })
    .then(res => res.json())
    .then(res => {
        if (res.error) {
            alert(res.error);
            console.log("Category Display error:", res.error);
            window.location.href = "/HomePage/index.html";
        } else if (res.msg) {
            console.log("Category Display successful:", res);

            sessionStorage.setItem('CategoryItemNames', JSON.stringify(res.names.split("~").filter(word => word !== "")));
            sessionStorage.setItem('CategoryItemPrices', JSON.stringify(res.prices.split("~").filter(word => word !== "")));
            sessionStorage.setItem('CategoryItemImgs', JSON.stringify(res.imgs.split(" ").filter(word => word !== "")));
            sessionStorage.setItem('CategoryItemColors', JSON.stringify(res.colors.split("~").filter(word => word !== "")));
            sessionStorage.setItem('CategoryItemIds', JSON.stringify(res.ids.split("~").filter(word => word !== "")));

            let names = JSON.parse(sessionStorage.getItem('CategoryItemNames'));
            let colors = JSON.parse(sessionStorage.getItem('CategoryItemColors'));
            let prices = JSON.parse(sessionStorage.getItem('CategoryItemPrices'));
            let imgs = JSON.parse(sessionStorage.getItem('CategoryItemImgs'));
            let ids = JSON.parse(sessionStorage.getItem('CategoryItemIds'));

            for (let i = 0; i < names.length; i++) {
                console.log(names[i]);
                additem(names[i], prices[i], imgs[i], colors[i], ids[i], targetContainer,i);
            }
        }
    })
    .catch(error => {
        console.error("Error during fetch:", error);
        alert("Server error, please try again later.");
    });
}



/*$('.minus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value > 1) {
        value = value - 1;
    } else {
        value = 0;
    }

$input.val(value);

});

$('.plus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value < 100) {
      value = value + 1;
    } else {
        value =100;
    }

    $input.val(value);
});

$('.like-btn').on('click', function() {
$(this).toggleClass('is-active');
});*/



// document.getElementById('plus-btn').addEventListener('click', function() {
//     incrementQuantity();
//     UpdatePrice();
// });
// document.getElementById('minus-btn').addEventListener('click', function() {
//     decrementQuantity();
//     UpdatePrice();
// });
// function incrementQuantity() {
//     var quantityInput = document.getElementById("quanumber");
//     var currentQuantity = parseInt(quantityInput.value);
//     quantityInput.value = currentQuantity + 1;
//     console.log("Incremented Quantity:", quantityInput.value); // Debugging line
// }
// function decrementQuantity() {
//     var quantityInput = document.getElementById("quanumber");
//     var currentQuantity = parseInt(quantityInput.value);
//     if (currentQuantity > 1) {
//         quantityInput.value = currentQuantity - 1;
//     }
//     console.log("Decremented Quantity:", quantityInput.value); // Debugging line
// }
// function UpdatePrice()
// {
//     var quantityInput = document.getElementById("quanumber");
//     var quantity = parseInt(quantityInput.value);
//     var price = parseFloat(document.getElementById("price").value);
//     console.log("Quantity in UpdatePrice:", quantity); // Debugging line
//     console.log("Price in UpdatePrice:", price); // Debugging line
//     var totalPrice = price * quantity;
//     console.log("Total Price:", totalPrice); // Debugging line
//     document.getElementsByClassName("item-price")[0].innerHTML = "$" + totalPrice;
// }

function IncreamentQuantity(Index)
{
    document.getElementById("quanumber" + Index).value++;
    UpdatePrice(document.getElementById("quanumber" + Index).value,Index);
}
function DecreamentQuantity(Index)
{
    if(document.getElementById("quanumber" + Index).value > 1)
        document.getElementById("quanumber" + Index).value--;
    UpdatePrice(document.getElementById("quanumber" + Index).value,Index);
}
function UpdatePrice(times,Index)
{
    let price = document.getElementById("price" + Index).value;
    document.getElementById("updatedprice"+ Index).innerHTML = "₪" + (price * times).toFixed(2);
}


function Filter()
{
    let names = JSON.parse(sessionStorage.getItem('CategoryItemNames'))
    let counter = 0;
    names.forEach(element => {
        counter++;
    });
}