const { MongoClient } = require('mongodb');


function AddNewUser()
{
    var useremail = document.getElementById("up-Email").value;
    var username = document.getElementById("up-Username").value;
    var pass = document.getElementById("up-Password").value;

    async function run()
    {

        const uri = "mongodb+srv://MusicShopGroup:1234@musicshopdatabase.kbxcufo.mongodb.net/";
        const client = new MongoClient(uri);
        const bcrypt = require('bcrypt');

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
        const result = await People.insertOne(doc);
    

    }
    
}