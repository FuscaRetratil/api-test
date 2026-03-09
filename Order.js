const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    productid: {type: Number, required: true},
    quantify: {type: Number, required: true},
    price: {type: Number, required: true}
});

const OrderSchema = new mongoose.Schema ({
    orderId: { type: String, required: true, unique: true},
    value: { type: Number, required: true},
    creationDate: { type: Date, required: true},
    items: [ItemSchema]
});

module.exports = mongoose.model("Order", OrderSchema);