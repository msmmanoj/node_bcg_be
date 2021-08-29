const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

const CustomerPolicy = require('./models/customerPolicy');
const {ObjectId} = require("mongodb");

const app = express();

const columnJson = require('./column.json');

app.use(cors())
app.use(express.json())

/*
Get the policy details based on customer id or policy id
 */
app.get('/getPolicyDetails', (req, res) => {
    const customerId = req.query.customerId;
    const policyId = req.query.policyId;
    CustomerPolicy.find({
        $or: [
            {'Policy_id': policyId},
            {'Customer_id': customerId},
        ]
    }).select(['-__v']).then((data) => {
        return res.json(data);
    }).catch(err => {
        console.log(err);
    })
})

/*
Get Column structure in json to material ui table (Refer column.json file for structure).
 */

app.get('/getColumnData', (req, res) => {
    res.json(columnJson);
})

/*
Get policy data for creating bar chart based on year and region.
 */
app.get('/getChartData', (req, res) => {
    const year = req.query.year || '2018';
    const region = req.query.region || 'South';
    CustomerPolicy.find({
        $and: [
            {"Date of Purchase": {$gte: new Date(year + '-01-01'), $lt: new Date(year + '-12-31')}},
            {"Customer_Region": region}
        ]
    }).select(['Policy_id', 'Date of Purchase', 'Customer_Region']).then((data) => {
        return res.json(data);
    }).catch(err => {
        console.log(err);
    });
})

/*
Update policy
 */
app.post('/policy', (req, res) => {
    const id = req.body._id;
    delete req.body._id;
    const body = req.body
    CustomerPolicy.updateOne(
        {_id: new ObjectId(id)},
        {$set: body}
    ).then(() => {
        console.log(body);
        res.json("ok");
    }).catch(err => {
        console.log(err)
    })
})


mongoose.connect('mongodb://localhost:27017/samplemongodb', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        app.listen(4000);
    })
    .catch(err => console.log(err))