const express = require('express')
const app = express();

//issue is fixed
function checkAgeMiddleware(req, res, next) {
    const age = req.query.age;
    if (age > 14) {
        next();
    } else {
        res.status(411).json({
            msg: "Sorry you are not eligible"
        })
    }
}

//calling middleware : calls the next middleware fns in the stack
app.get("/ride1",checkAgeMiddleware, function (req, res) {
    res.status(200).json({
        msg: "you have successfully riden ride1"
    })
})

app.get("/ride2",checkAgeMiddleware, function (req, res) {
    res.status(200).json({
        msg: "you have successfully riden ride2"
    })
})


app.listen(8080);