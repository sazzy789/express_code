const express = require('express');
const jwt = require('jsonwebtoken');
const cors= require('cors');

const app = express();
app.use(express.json());
const JWT_SECRET = 'JWT_SECRET';

const users = [];

app.use(cors());


app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.status(200).json({
        "message": "Signed Up successfully"
    })

})

app.post("/signin", function (req, res) {
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
            username: req.username
        })
    } else {
        res.status(401).json({
            "message": "User not found"
        })
    }

})

app.listen(8000);