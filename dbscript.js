const mongoose = require('mongoose');
const csv = require("csvtojson");
const CustomerPolicy = require("./models/customerPolicy");

const csvFilePath = './insurance_data.csv';

mongoose.connect('mongodb://localhost:27017/samplemongodb', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async function () {
    console.log("Connection Successful!");
    const data = await csv().fromFile(csvFilePath);
    await CustomerPolicy.deleteMany({});
    CustomerPolicy.insertMany(data).then(() => {
        console.log("data added successfully");
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        db.close();
    });
})

