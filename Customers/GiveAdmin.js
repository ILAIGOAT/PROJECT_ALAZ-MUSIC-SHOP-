function GiveAdmin()
{
    var email = document.getElementById("email").value;

    console.log("Giving Admin request");
    
    fetch('http://localhost:88/user/giveadmin', {
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
            alert('New Admin Was Given');
            console.log("New Admin:", res.message);
            window.location.href = "/HomePage/index.html";
        }
    });
}