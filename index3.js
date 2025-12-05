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

//since we are calling the middleware in each routes, we can call it above these routes, at one place , like this below, will reduce funtion signature
app.use(checkAgeMiddleware);

//NOTE: all routes above this , will not be able to access middlewares

//calling middleware : calls the next middleware fns in the stack
app.get("/ride1", function (req, res) {
    res.status(200).json({
        msg: "you have successfully riden ride1"
    })
})

app.get("/ride2", function (req, res) {
    res.status(200).json({
        msg: "you have successfully riden ride2"
    })
})


app.listen(8080);