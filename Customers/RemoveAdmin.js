function TakeAdmin()
{
    var email = document.getElementById("email").value;

    console.log("Take Admin request");
    
    fetch('http://localhost:88/user/takeadmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            alert(res.error);
            console.log("error:", res.error);
        } if(res.message) {
            alert('Premission Was Removed');
            console.log("New Admin:", res.message);
            window.location.href = "/HomePage/index.html";
        }
    });
}