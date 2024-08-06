
function additem(name,price,img,color,id){
    var ul = document.getElementById("items");
    var li = document.createElement("li");
    price = Number(price);
    amount = Number(amount);
    li.innerHTML = '<div class=\"item\"><div class=\"buttons\"><span class=\"delete-btn\"></span><span class=\"like-btn\"></span></div><div class=\"image\"><img src=\"' + img + '\" alt=\"\" class=\"itemImg\" /></div><div class=\"description\"><span>' + name + '</span><span></span></div><div class=\"quantity\"><span>'+  amount +'</span></div><div class=\"total-price\">' + price * amount + '₪</div><button class=\"remove-btn\" data-id=\"'+id +'\">Remove from Cart</button></div>';
    ul.appendChild(li);
}


function addToCart() {
    alert('Item added to cart!');
}

let circle = document.querySelector(".color-option");//for the colors
        circle.addEventListener("click", (e)=>{
          let target = e.target;
          if(target.classList.contains("circle")){
            circle.querySelector(".active").classList.remove("active");
            target.classList.add("active");
            document.querySelector(".main-images .active").classList.remove("active");
            document.querySelector(`.main-images .${target.id}`).classList.add("active");
    }
});

function receiveCartItems(Category) {
        
    console.log("Sending get category items request");

    fetch('http://localhost:88/user/getCategoryItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Category })
    })
    .then(res => {
        return res.json();
    })
    .then(res => {

        if (res.error) {
            alert(res.error);
            console.log("Category Display error:", res.error);
            window.location.href = "/HomePage/index.html";
        } else if (res.msg) {
            console.log("Category Display successful:", res);

            sessionStorage.setItem('CatgoryItemNames', JSON.stringify((res.names).split("~").filter(word => word !== "")));
            console.log("Names Are: ", sessionStorage.getItem("CartItemNames"))
            // sessionStorage.setItem('CartItemColors', JSON.stringify((res.colors).split("~").filter(word => word !== "")));
            sessionStorage.setItem('CatgoryItemPrices', JSON.stringify((res.prices).split("~").filter(word => word !== "")));
            console.log("Names Are: ", sessionStorage.getItem("CartItemPrices"))
            // sessionStorage.setItem('CartItemInstrumenttypes', JSON.stringify((res.instrumenttypes).split("~").filter(word => word !== "")));
            sessionStorage.setItem('CatgoryItemImgs', JSON.stringify((res.imgs).split(" ").filter(word => word !== "")));
            console.log("Names Are: ", sessionStorage.getItem("CartItemImgs"))
            sessionStorage.setItem('CatgoryItemColors', JSON.stringify((res.amounts).split("~").filter(word => word !== "")));
            console.log("Names Are: ", sessionStorage.getItem("CartItemAmounts"))
            sessionStorage.setItem('CatgoryItemIds', JSON.stringify((res.ids).split(" ").filter(word => word !== "")));

            let names = JSON.parse(sessionStorage.getItem('CategoryItemNames'));
            // let colors = JSON.parse(sessionStorage.getItem('CartItemColors'));
            let prices = JSON.parse(sessionStorage.getItem('CategoryItemPrices'));
            // let instrumenttypes = JSON.parse(sessionStorage.getItem('CartItemInstrumenttypes'));
            let imgs = JSON.parse(sessionStorage.getItem('CategoryItemImgs'));
            let colors = JSON.parse(sessionStorage.getItem('CategoryItemColors'));
            let ids = JSON.parse(sessionStorage.getItem('CategoryItemIds'));

            for (let i = 0; i < names.length; i++) {
                console.log(names[i]);
                additem(names[i], prices[i], imgs[i], colors[i],ids[i]);
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

function IncreamentQuantity()
{
    document.getElementById("quanumber").value++;
    UpdatePrice(document.getElementById("quanumber").value);
}
function DecreamentQuantity()
{
    if(document.getElementById("quanumber").value > 1)
        document.getElementById("quanumber").value--;
    UpdatePrice(document.getElementById("quanumber").value);
}
function UpdatePrice(times)
{
    let price = document.getElementById("price").value;
    document.getElementById("updatedprice").innerHTML = "$" + (price * times).toFixed(2);
}
