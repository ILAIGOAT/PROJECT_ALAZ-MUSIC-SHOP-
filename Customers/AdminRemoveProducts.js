function RemoveProduct()
{
    
    const productname = document.getElementById("productname").value;

    console.log("Remove Product request");
    
    fetch('http://localhost:88/item/removeproduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: productname
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
