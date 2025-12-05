const express = require('express');
const app = express();

//as of now created in-memory db
const user = [{
    name: "satyam",
    kidneys: [{
        healthy: false
    }, {
        healthy: true
    }]
}];

app.use(express.json());

//number of kidneys
function noOfKidneys(name) {


}

app.get("/", function (req, res) {
    const user1 = user[0].kidneys;
    const noOfKidneys = user1.length;
    let noOfHealthyKidneys = 0;
    for (let i = 0; i < user1.length; i++) {
        if (user1[i].healthy) {
            noOfHealthyKidneys++;
        }
    }
    const noOfUnhealthyKidneys = noOfKidneys - noOfHealthyKidneys
    res.json({
        noOfHealthyKidneys,
        noOfUnhealthyKidneys
    })
})

app.post("/", function (req, res) {
    console.log("req body: ", req.body);
    const isHealthy = req.body.isHealthy;
    user[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})

app.put("/", function (req, res) {
    const user1 = user[0].kidneys;
    for (let i = 0; i < user1.length; i++) {
        if (!user1[i].healthy) {
            user1[i].healthy = true;
        }
    }
    res.json({
        msg: "all kidneys made healthy"
    })
})

app.delete("/", function (req, res) {
    const user1 = user[0].kidneys;
    const allHealthy = [];
    for (let i = 0; i < user1.length; i++) {
        if (user1[i].healthy) {
            allHealthy.push({
                healthy: true
            })
        }
    }
    user[0].kidneys = allHealthy;
    
    req.json({
        msg : "all unhealthy kidneys removed"
    })
})

app.listen(3001);