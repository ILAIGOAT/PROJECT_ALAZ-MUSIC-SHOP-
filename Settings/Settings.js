function ChangeUserimg()
{

    var pfp = document.getElementById("imageUrl").value;
    var email = sessionStorage.getItem('ConnectedEmail');

    console.log("Sending pfp Change request");
    
    fetch('http://localhost:88/user/changepfp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            pfp
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
            sessionStorage.setItem('ConnectedUserimg',pfp);
            window.location.href = "/HomePage/index.html";
        }
    });
}