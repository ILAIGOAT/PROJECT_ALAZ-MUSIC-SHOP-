// import { ShowConnectedUser } from "../HomePage/HelperFunctions.js";


/*export*/ function AddNewUser() {
    var useremail = document.getElementById("up-Email").value;
    var username = document.getElementById("up-Username").value;
    var pass = document.getElementById("up-Password").value;
    if(!(isValidEmail(useremail)))
        return alert('Enter Valid Email!');
    if(username === "")
        return alert('Enter Username!');
    if(pass === "")
        return alert('Enter Password!');
    
    console.log("Sending registration request");

    fetch('http://localhost:88/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email: useremail,
            password: pass
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(res.error) {
            alert(res.error);
            console.log("Registration error:", res.error);
        } if(res.message) {
            alert('User registered successfully');
            console.log("Registration successful:", res.message);
        }
    });
    document.getElementById("up-Email").value = "";
    document.getElementById("up-Username").value = "";
    document.getElementById("up-Password").value = "";
}

function isValidEmail(email) {
    // Define the regular expression for validating an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regular expression
    return emailRegex.test(email);
}

/*export*/ function loginUser() {
    var useremail = document.getElementById("login-Email").value;
    var pass = document.getElementById("login-Pass").value;
    
    console.log("Sending login request");

    fetch('http://localhost:88/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: useremail,
            password: pass
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            alert(res.error);
            console.log("Login error:", res.error);
        } if(res.message) {
            alert('Login successful');
            console.log("Login successful:", res.message);
            window.location.href = "/HomePage/index.html";
            sessionStorage.setItem('userConnected' , 'true');//thechange that happened//change to session storage if there will be bugs 'Yanivs kinda idea'.
            sessionStorage.setItem('ConnectedEmail',useremail);
            sessionStorage.setItem('ConnectedUsername',(res.message).substring(20));//saving the username of the logined user. takes the index 20 till the end of the message string to get the username u can see/line 56 and 58 in routertest.  
            sessionStorage.setItem('ConnectedUserimg',res.img);
            sessionStorage.setItem('IfUserAdmin',res.admin);
            //ShowConnectedUser(true);
        }
    });

    
}


/*function AddNewUser()
{
    var useremail = document.getElementById("up-Email").value;
    var username = document.getElementById("up-Username").value;
    var pass = document.getElementById("up-Password").value;
    fetch('http://localhost:88/user/register',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email:useremail,
            password:pass
        })
    }).then(res => res.json()).then(res => {
        if(res.error){
            alert(res.error);
        }
        else
        {
            console.log(res)
            alert('User registered successfully!')
        }
        })
    
    
}*/




/*
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');


const uri = "mongodb+srv://MusicShopGroup:1234@musicshopdatabase.kbxcufo.mongodb.net/?retryWrites=true&w=majority&appName=MusicShopDataBase";
        const client = new MongoClient(uri);
        

        await client.connect();





        const hashedpassword = await bcrypt.hash(pass);

        const doc = {
            _id: Date.now().toString(),
            name: username,
            email: useremail,
            hashedpassword: hashedpassword,//switch into hashed password using js json
            unhashedpassword: pass
    
        }
    
    
        const database = client.db("USERS");
        const People = database.collection("People");
        await People.insertOne(doc);*/