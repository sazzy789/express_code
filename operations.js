const express = require('express');
const app = express();

app.get('/multiply', function (req, res) {
    const n1 = req.query.n1;
    const n2 = req.query.n2;

    var product = n1 * n2;
    res.status(200).json({
        "product": product
    });
})
//we used parseInt to convert into Integer
//check operation_fixed.png
app.get('/add', function (req, res) {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

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