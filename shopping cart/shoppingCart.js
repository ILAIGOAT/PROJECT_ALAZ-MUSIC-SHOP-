function additem(name,price,img,amount){
    var ul = document.getElementById("items");
    var li = document.createElement("li");
    li.innerHTML = '<div class=\"item\"><div class=\"buttons\"><span class=\"delete-btn\"></span><span class=\"like-btn\"></span></div><div class= \"image\"><img src=\"' + img + '\" alt=\"\" class="itemImg" /></div><div class=\"description\"><span>' + name + '</span><span>Brown</span></div><div class=\"quantity\"><button class=\"plus-btn\" type=\"button" name=\"button\"><img src=\"plus-lg.svg\" alt=\"\" /></button><input type=\"text\" name=\"name\" value=\"'+ amount + '\"><button class=\"minus-btn\" type=\"button\" name=\"button\"><img src=\"dash.svg\" alt=\"\" /></button></div><div class=\"total-price\">' + Number(price)*Number(amount) + '</div></div></div>';
    ul.appendChild(li);
}
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

function resiveCartItems() {
    var email = sessionStorage.getItem('ConnectedEmail');
        
    console.log("Sending get cart items request");

    fetch('http://localhost:88/user/getCartItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(res => {
        console.log("Fetch response status:", res.status);
        return res.json();
    })
    .then(res => {
        console.log("Fetch response body:", res);

        if (res.error) {
            alert(res.error);
            console.log("Cart Display error:", res.error);
            window.location.href = "/HomePage/index.html";
        } else if (res.msg) {
            console.log("Cart Display successful:", res);

            sessionStorage.setItem('CartItemNames', JSON.stringify((res.names).split("~").filter(word => word !== "")));
            console.log("Names Are: ", sessionStorage.getItem("CartItemNames"))
            // sessionStorage.setItem('CartItemColors', JSON.stringify((res.colors).split("~").filter(word => word !== "")));
            sessionStorage.setItem('CartItemPrices', JSON.stringify((res.prices).split("~").filter(word => word !== "")));
            console.log("Names Are: ", sessionStorage.getItem("CartItemPrices"))
            // sessionStorage.setItem('CartItemInstrumenttypes', JSON.stringify((res.instrumenttypes).split("~").filter(word => word !== "")));
            sessionStorage.setItem('CartItemImgs', JSON.stringify((res.imgs).split(" ").filter(word => word !== "")));
            console.log("Names Are: ", sessionStorage.getItem("CartItemImgs"))
            sessionStorage.setItem('CartItemAmounts', JSON.stringify((res.amounts).split("~").filter(word => word !== "")));
            console.log("Names Are: ", sessionStorage.getItem("CartItemAmounts"))

            let names = JSON.parse(sessionStorage.getItem('CartItemNames'));
            // let colors = JSON.parse(sessionStorage.getItem('CartItemColors'));
            let prices = JSON.parse(sessionStorage.getItem('CartItemprices'));
            // let instrumenttypes = JSON.parse(sessionStorage.getItem('CartItemInstrumenttypes'));
            let imgs = JSON.parse(sessionStorage.getItem('CartItemImgs'));
            let amounts = JSON.parse(sessionStorage.getItem('CartItemAmounts'));

            for (let i = 0; i < names.length; i++) {
                console.log(names[i])
                additem(names[i], prices[i], imgs[i], amounts[i]);
            }
        }
    })
    .catch(error => {
        console.error("Error during fetch:", error);
        alert("Server error, please try again later.");
    });
}
