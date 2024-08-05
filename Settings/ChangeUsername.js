function ChangeUsername()
{

    var newusername = document.getElementById("username").value;
    var email = sessionStorage.getItem('ConnectedEmail');

    console.log("Sending username Change request");
    
    fetch('http://localhost:88/user/changeusername', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            username: newusername
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
            sessionStorage.setItem('ConnectedUsername',newusername);
            window.location.href = "/HomePage/index.html";
        }
    });
}