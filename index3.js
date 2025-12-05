const express = require('express')
const app = express();

//returns boolean if age >14 
function checkAge(age) {
    if (age > 14) return true; else return false;
}

app.get("/ride1", function (req, res) {
    const age = req.query.age;
    if (checkAge(age)) {
        res.status(200).json({
            msg: "you have successfully riden ride1"
        })
    } else {
        res.status(411).json({
            msg : "sorry you are not eligible"
        })
    }

})

app.listen(8080);