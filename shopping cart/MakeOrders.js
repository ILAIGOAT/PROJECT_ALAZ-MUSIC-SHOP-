function MakeAnOrder()
{
    tmpprice = document.getElementById("totalPrice").innerHTML;
    totalprice = parseFloat(tmpprice.slice(1));
    address = document.getElementById("useraddress").value;
    email = sessionStorage.getItem('ConnectedEmail');
    cart = JSON.parse(sessionStorage.getItem('CartItemIds'));
    cartAmounts = JSON.parse(sessionStorage.getItem('CartItemAmounts'));

    fetch('http://localhost:88/order/addorder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address,
            cart,
            cartAmounts,
            totalprice,
            useremail: email
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(res.error) {
            alert(res.error);
            console.log("adding error:", res.error);
        } if(res.message) {
            alert('Order Done successfully!');
            console.log("Order Done successfuly:", res.message);
            window.location.href = "/HomePage/index.html";
        }
    });
    
}