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
//check issue ijn operation_issue.png ? 
// why when passing 2,3, giving 23
app.get('/add', function (req, res) {
    const n1 = req.query.n1;
    const n2 = req.query.n2;

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
    const n1 = req.query.n1;
    const n2 = req.query.n2;

    var subtract = n1 - n2;
    res.status(200).json({
        "subtraction result": subtract
    });
})



app.listen(8082);