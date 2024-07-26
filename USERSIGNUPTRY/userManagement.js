const fs = require('fs');

// Load existing users from the JSON file
function loadUsers() {
  try {
    const data = fs.readFileSync('usersDatabase.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { users: [] };
  }
}

// Save users to the JSON file
function saveUsers(usersDatabase) {
  fs.writeFileSync('usersDatabase.json', JSON.stringify(usersDatabase, null, 2));
}

// Function to add a new user
function addUser(name, email) {
  const usersDatabase = loadUsers();

  const newUser = {
    user_id: usersDatabase.users.length + 1,
    name: name,
    email: email,
    registration_date: new Date().toISOString().split('T')[0]
  };

  usersDatabase.users.push(newUser);
  saveUsers(usersDatabase);
}

// Export the functions for use in an HTML project
module.exports = {
  addUser: addUser,
  loadUsers: loadUsers
};