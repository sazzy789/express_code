const  express = require('express');
const {randomBytes} = require("node:crypto");

const app = express();

function generateToken(length) {
    if(length % 2 !== 0){
        length++;
    }
    return randomBytes(length/2).toString("hex");
}

var users = [];

app.use(express.json());

app.post('/signup',function(req,res){
    var userInfo = {
        'username' : req.body.username,
        'password' : req.body.password,
    }
    users.push(userInfo);
    res.status(200).json({
        'msg' : 'signed up succesfully'
    });

    console.log(users);
});

app.post('/signin',function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const userfound = users.find(function(u){
        if (u.username == username && u.password == password){
            return true;
        } else { 
            return false;
        }
    })

    if(userfound){
        const token = generateToken(24);
        userfound.token = token;
        res.status(200).json({
            token : token
        })
    } else {
        res.status(403).json({
            'msg' : "Invalid username or pasword"
        })
    }
    console.log(users);

});


app.listen(8081);

/*
Lets initialise an express app that we will use to generate an `authenticated backend` today.

- Initialise an empty Node.js project
 
- Create an `index.js` file, open the project in visual studio code
    
- Add `express` as a dependency
    
- Create two new  POST routes, one for `signing up` and one for `signing in`
    
- Use `express.json` as a middleware to parse the post request body

- Create an `in memory` variable called `users` where you store the `username` , `password` and a `token` (we will come to where this token is created later.

- Complete the signup endpoint to store user information in the `in memory variable`
 
- Create a function called `generateToken` that generates a random string for you

- Finish the signin endpoint. It should generate a token for the user and put it in the `in memory` variable for that user
*/