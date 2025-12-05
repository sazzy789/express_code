//creating an HTTP server
//express
//express is not a node default library

const express = require('express');

const app = express();

//calculate sum till number
function calculate(n) {
    let ans = 0;
    for (let i = 0; i <= n; i++) {
        ans = ans + i;
    }
    return ans;
}

//req - request, res - response
app.get("/", function (req, res) {
    const  n = req.query.n;
    const ans = calculate(n);
    res.send("hi there your sum is: " + ans.toString() );
})
app.listen(3000);