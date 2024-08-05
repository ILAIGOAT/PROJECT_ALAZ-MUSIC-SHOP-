// script.js

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



document.getElementById('plus-btn').addEventListener('click', function() {
    incrementQuantity();
    UpdatePrice();
});
document.getElementById('minus-btn').addEventListener('click', function() {
    decrementQuantity();
    UpdatePrice();
});
function incrementQuantity() {
    let quantityInput = document.getElementById("quanumber");
    let currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
    console.log("Incremented Quantity:", quantityInput.value); // Debugging line
}
function decrementQuantity() {
    let quantityInput = document.getElementById("quanumber");
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
    }
    console.log("Decremented Quantity:", quantityInput.value); // Debugging line
}
function UpdatePrice()
{
    let quantityInput = document.getElementById("quanumber");
    let quantity = parseInt(quantityInput.value);
    let price = parseFloat(document.getElementById("price").value);
    console.log("Quantity in UpdatePrice:", quantity); // Debugging line
    console.log("Price in UpdatePrice:", price); // Debugging line
    let totalPrice = price * quantity;
    console.log("Total Price:", totalPrice); // Debugging line
    document.getElementsByClassName("item-price")[0].innerHTML = "$" + totalPrice;
}
