const express = require('express'); 
const fs = require("fs"); 

const app = express(); 

app.get('/user', (req, res) => {

    const uid = req.query['uid'];
    let err = {
        "message": "User not found"
    }
    try {
        let found = 0; 

        const usersJSON = fs.readFileSync("./users.json");
        const users = JSON.parse(usersJSON);

        for (let i = 0; i < users.length; i++) {
            if (users[i].id == uid) {
                found = 1; 
                let response = {
                    "id":users[i].id,
                    "name":users[i].name,
                    "email":users[i].email,
                    "address":users[i].address.street +", "+ users[i].address.city +", "+users[i].address.zipcode,
                    "phone":users[i].phone
                }
                res.send(response);
            }
        }

        if (found === 0) {
            res.send(err);
        }

    } catch (err) {
        res.send(err);
    }
});

app.get('/users/all', (req, res) => {
    try {
        const usersJSON = fs.readFileSync("./users.json");
        const users = JSON.parse(usersJSON);
        users.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        });
        res.json(users);

    } catch (err) {
        res.send(err);
    }
});

app.listen(8080, () => {
    console.log("APPLICATION STARTING ON PORT 8080");
});