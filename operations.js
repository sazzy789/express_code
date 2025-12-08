const express = require('express');
const app = express();

//Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console
app.use(function (req, res, next) {
    const timestamp = new Date();
    console.log('[' + timestamp + ']' + req.method + '  ' + req.originalUrl);
    next();
})

app.get('/multiply', function (req, res) {
    const n1 = req.query.n1;
    const n2 = req.query.n2;
    var product = n1 * n2;
    res.status(200).json({
        "product": product
    });
})

app.get('/add/:firstArg/:secondArg', function (req, res) {
    const n1 = parseInt(req.params.firstArg);
    const n2 = parseInt(req.params.secondArg);

    var sum = n1 + n2;
    res.status(200).json({
        "sum": sum
    });
})
app.get('/divide', function (req, res) {
    const n1 = req.query.n1;
    const n2 = req.query.n2;

    var divide = n1 / n2;
    res.status(200).json({
        "divison result": divide
    });
})
app.get('/subtract', function (req, res) {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    var subtract = n1 - n2;
    res.status(200).json({
        "subtraction result": subtract
    });
})



app.listen(8082);