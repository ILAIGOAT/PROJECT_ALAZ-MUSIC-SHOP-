function CreateNewUserpass()
{

    var pass1 = document.getElementById("password1").value;
    var pass2 = document.getElementById("password2").value;
    if(pass1 != pass2)
        return alert('The Passwords Dont Match!')

    var email = sessionStorage.getItem('ConnectedEmail');

    console.log("Sending password Change request");
    
    fetch('http://localhost:88/user/aprovepasswordchange', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password: pass1
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            alert(res.error);
            console.log("Change error:", res.error);
        } if(res.message) {
            alert('Password Change Aproved, Lets Create New Password!');
            console.log("Password aproved:", res.message);
            window.location.href = "/Settings/CreateNewpass.html";
        }
    });
}