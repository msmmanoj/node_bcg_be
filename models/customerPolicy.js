const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const customerPolicySchema = new Schema({
    "Policy_id": Number,
    "Date of Purchase": {
        type: Date
    },
    "Customer_id": Number,
    "Fuel": String,
    "VEHICLE_SEGMENT": String,
    "Premium": {
        type: Number,
        min: 0,
        max: 1000000
    },
    "bodily injury liability": Number,
    "personal injury protection": Number,
    "property damage liability": Number,
    "collision": Number,
    "comprehensive": Number,
    "Customer_Gender": String,
    "Customer_Income group": String,
    "Customer_Region": String,
    "Customer_Marital_status": Number
})

module.exports = mongoose.model('CustomerPolicy', customerPolicySchema);