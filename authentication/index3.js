const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
const JWT_SECRET = 'JWT_SECRET';

const users = [];


app.post("/signup", function (req, res) {
    const username = req.body.username;
    const passowrd = req.body.passowrd;

    users.push({
        username: username,
        passowrd: passowrd
    })

    res.status(200).json({
        "message": "Signed Up successfully"
    })

})

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const passowrd = req.body.passowrd;

    const userfound = users.find(function (u) {
        if (u.username == username && u.passowrd == passowrd) {
            return true;
        } else {
            return false;
        }
    })

    if (userfound) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET)
        res.status(200).json({
            "message": "You are signed in",
            token: token
        })
    } else {
        res.status(401).json({
            "message": "You are not authorized"
        })
    }

})
function auth(req, res, next) {
    const token = req.headers.authorization;
    const decodedInfo = jwt.verify(token, JWT_SECRET);

    if (decodedInfo.username) {
        req.username = decodedInfo.username; //modifying the request (property of middleware)
        next();
    } else {
        res.status(401).json({
            "message": "you are unauthorized"
        })
    }
}

app.get("/me", auth, function (req, res) {
    const userfound = users.find(function (u) {
        if (u.username == req.username) {
            return true;
        } else {
            return false;
        }
    })
    if (userfound) {
        res.status(200).json({
            "message": "You are authenticated",
            token: token
        })
    } else {
        res.status(401).json({
            "message": "User not found"
        })
    }

})

app.listen(8000);