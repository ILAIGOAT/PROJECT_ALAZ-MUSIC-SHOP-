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




$('.minus-btn').on('click', function(e) {
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
});

function UpdatePrice()
{
    let quantity = document.getElementById("quanumber").value;//fix quantity as the start value and not as up to dated.need to update
    let price = document.getElementById("price").value;
    document.getElementsByClassName("item-price")[0].innerHTML = "$" +  price * quantity;
}
