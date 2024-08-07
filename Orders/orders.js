function addOrderDisplay(id,address,cart,cartAmounts,totalprice,useremail,date){
    let ArrayAmounts = cartAmounts.split(",");
    console.log(ArrayAmounts);
    let FinaleAmount = 0;
    for(let i = 0; i<ArrayAmounts.length;i++)
    {
        FinaleAmount += Number(ArrayAmounts[i]);
        console.log(FinaleAmount);

        
    }
    console.log(FinaleAmount);
    let HTMLtoAdd = '<div class=\"order\"><h2>Order ID: '+id+'</h2><p>Ordered By:'+useremail+'</p><p>Date: '+ date+'</p><p>Status: On The Way</p><p>Address:'+address+'</p><p class=\"'+id+'-amount\">Items Ordered Amount: '+FinaleAmount+'</p><p>Price: '+(Number(totalprice)).toFixed(2) +'</p></div>';
    document.getElementById("order-list").insertAdjacentHTML('beforeend',HTMLtoAdd);

}

function getOrders(){
    console.log("Sending get Orders request");
    email = sessionStorage.getItem("ConnectedEmail")

    fetch('http://localhost:88/order/getOrders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(res => {
        if (res.error) {
            alert(res.error);
            console.log("Orders Display error:", res.error);
            window.location.href = "/HomePage/index.html";
        } else if (res.msg) {
            console.log("Orders Display successful:", res);

            sessionStorage.setItem('OrderIds', JSON.stringify(res.ids.split("~").filter(word => word !== "")));
            sessionStorage.setItem('OrderAddresses', JSON.stringify(res.addresses.split("~").filter(word => word !== "")));
            sessionStorage.setItem('OrderCarts', JSON.stringify(res.carts.split("~").filter(word => word !== "")));
            sessionStorage.setItem('OrderCartAmounts', JSON.stringify(res.cartAmounts.split("~").filter(word => word !== "")));
            sessionStorage.setItem('OrderTotalPrices', JSON.stringify(res.totalPrices.split("~").filter(word => word !== "")));
            sessionStorage.setItem('OrderEmails', JSON.stringify(res.emails.split("~").filter(word => word !== "")));
            sessionStorage.setItem('OrderDates', JSON.stringify(res.dates.split("~").filter(word => word !== "")));

            let ids = JSON.parse(sessionStorage.getItem('OrderIds'));
            let addresses = JSON.parse(sessionStorage.getItem('OrderAddresses'));
            let carts = JSON.parse(sessionStorage.getItem('OrderCarts'));
            console.log(carts);
            let cartAmounts = JSON.parse(sessionStorage.getItem('OrderCartAmounts'));
            let totalPrices = JSON.parse(sessionStorage.getItem('OrderTotalPrices'));
            let emails = JSON.parse(sessionStorage.getItem('OrderEmails'));
            let dates = JSON.parse(sessionStorage.getItem('OrderDates'));
            console.log("is" + dates);

            for (let i = 0; i < ids.length; i++) {
                console.log(carts[i]);
                addOrderDisplay(ids[i], addresses[i], carts[i], cartAmounts[i], totalPrices[i],emails[i],dates[i]);
            }
        }
    })
    .catch(error => {
        console.error("Error during fetch:", error);
        alert("Server error, please try again later.");
    });
}

