const express = require('express');
const bodyParser = require('body-parser');
const { addUser } = require('./userManagement');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

app.post('/addUser', (req, res) => {
  const { name, email } = req.body;
  try {
    addUser(name, email);
    res.status(200).send('User added successfully');
  } catch (err) {
    res.status(500).send('Error adding user');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});