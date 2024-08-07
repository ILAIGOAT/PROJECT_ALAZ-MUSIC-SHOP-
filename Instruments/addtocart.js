function addToCart(event,Index)
{
    var targetElement = event.target;
    ItemId =  targetElement.getAttribute("data-id");
    Amount = document.getElementById("quanumber" + Index).value;
    useremail = sessionStorage.getItem('ConnectedEmail');

    fetch('http://localhost:88/user/addtocart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: useremail,
            ItemId,
            Amount

        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            alert(res.error);
            console.log("Add error:", res.error);
        } if(res.message) {
            alert('Item Added Successfuly successful');
            console.log("Item Added successful:", res.message);
            document.getElementById("quanumber" + Index).value = 1;
            document.getElementById("updatedprice" + Index).innerHTML = "₪" + document.getElementById("price" + Index).value;
        }
    });
}