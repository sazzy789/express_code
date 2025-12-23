const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "ilovemotii"

const app = express();
app.use(express.json());
var users = [];

app.post('/signup', function (req, res) {
    var userInfo = {
        'username': req.body.username,
        'password': req.body.password,
    }
    users.push(userInfo);
    res.status(200).json({
        'msg': 'signed up succesfully'
    });

    console.log(users);
});

app.post('/signin', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userfound = users.find(function (u) {
        if (u.username == username && u.password == password) {
            return true;
        } else {
            return false;
        }
    })

    if (userfound) {
        const token = jwt.sign({
            username : username
        }, JWT_SECRET);
        // userfound.token = token;
        res.status(200).json({
            token: token
        })
    } else {
        res.status(403).json({
            'msg': "Invalid username or pasword"
        })
    }
    console.log(users);

});
/* Let’s create an endpoint (/me ) that returns the user their information `only if they send their token */
app.get("/me", function (req, res) {
    const token = req.headers.authorization;
    //converting jwt into username
    const decodedInformation = jwt.verify(token,JWT_SECRET); // {username : "satyam"}

    const username = decodedInformation.username;

    const userfound = users.find(function (u) {
        if (u.username === username) {
            return true;
        } else {
            return false;
        }
    })
    if (userfound) {
        res.status(200).json({
            "username": userfound.username,
            "message": "you are authenticated"
        })
    } else {
        res.status(401).json({
            "message": "Unauthorized user"
        })
    }
})

app.listen(8000);

/*
Replace token logic with jwt
Lets change the token logic that we had to use jwts

Add the jsonwebtoken library as a dependency - [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

Get rid of our generateToken function

Create a JWT_SECRET variable

Create a jwt for the user instead of generating a token

Notice we put the username inside the token. The jwt holds your state.
You no longer need to store the token in the global users variable

In the /me endpoint, use jwt.verify to verify the token
*/