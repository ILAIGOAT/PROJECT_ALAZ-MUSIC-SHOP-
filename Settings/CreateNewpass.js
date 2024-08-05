function ChangeUserpass()
{

    var newpassword = document.getElementById("password").value;
    var email = sessionStorage.getItem('ConnectedEmail');

    console.log("Sending Password Change request");
    
    fetch('http://localhost:88/user/changeuserpass', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password: newpassword
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            alert(res.error);
            console.log("Change error:", res.error);
        } if(res.message) {
            alert('Change successful');
            console.log("Change successful:", res.message);
            window.location.href = "/SignInUp/SignInUp.html";
        }
    });
}