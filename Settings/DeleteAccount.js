function DeleteUserAccount()
{

    var enteredemail = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    var email = sessionStorage.getItem('ConnectedEmail');

    console.log("Sending Delete Account request");
    
    fetch('http://localhost:88/user/deleteuseraccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            enteredemail
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            alert(res.error);
            console.log("Change error:", res.error);
        } if(res.message) {
            alert('Account Deleted Successfuly!');
            console.log("Account Deleted:", res.message);
            window.location.href = "/SignInUp/SignInUp.html";
        }
    });
}