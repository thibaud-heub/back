const fs = require("fs");

/** Add a user to database */
function addUser (userData) {
    fs.readFile("./data/users.json", function (err, data) {
        if (err) throw err;
        const users = JSON.parse(data);
        users.push(userData);
        fs.writeFile("./data/users.json", JSON.stringify(users), function (err) {
            if (err) throw err;
        });
    });
}

/** Edit a user in database */
function editUser (userData) {
    fs.readFile("./data/users.json", function (err, data) {
        if (err) throw err;
        const users = JSON.parse(data);
        let userIndex;
        if ((userIndex = users.findIndex((element) => element.id === userData.id)) !== -1) {
            users[userIndex] = userData;
            fs.writeFile("./data/users.json", JSON.stringify(users), function (err) {
                if (err) throw err;
            });
        }
    });
}

/** Delete a user in database */
function deleteUser (id) {
    fs.readFile("./data/users.json", function (err, data) {
        if (err) throw err;
        const users = JSON.parse(data);
        let userIndex;
        if ((userIndex = users.findIndex((element) => element.id === id)) !== -1) {
            users.splice(userIndex, 1);
            fs.writeFile("./data/users.json", JSON.stringify(users), function (err) {
                if (err) throw err;
            });
        }
    });
}

/** Return users in database */
function getUsers () {
    return JSON.parse(fs.readFileSync("./data/users.json"));
}

module.exports = { addUser, editUser, deleteUser, getUsers };
