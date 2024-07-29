function AddNewUser()
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
    }).then(res => res.json()).then(res => {console.log(res)})
    
    

       
    

    
    
}




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