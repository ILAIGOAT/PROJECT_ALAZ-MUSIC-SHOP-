

function AddNewUser() {
    var useremail = document.getElementById("up-Email").value;
    var username = document.getElementById("up-Username").value;
    var pass = document.getElementById("up-Password").value;

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
        if (res.error) {
            console.log("Registration error:", res.error);
            alert(res.error);
        } else {
            console.log("Registration successful:", res);
            alert('User registered successfully');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while registering the user');
    });
}


function loginUser() {
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
        if (res.error) {
            console.log("Login error:", res.error);
            alert(res.error);
        } else {
            console.log("Login successful:", res);
            alert('Login successful');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while logging in');
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