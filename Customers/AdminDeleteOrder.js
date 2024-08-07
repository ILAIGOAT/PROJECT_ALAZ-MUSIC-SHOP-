function DeleteOrder(){
    Orderid = document.getElementById("orderid").value;
    
    console.log("Remove Order request");
    
    fetch('http://localhost:88/order/deleteorder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderid: Orderid
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            alert(res.error);
            console.log("error:", res.error);
        } if(res.message) {
            alert('Product Was Removed');
            console.log("Product:", res.message);
            window.location.href = "/HomePage/index.html";
        }
    });
}