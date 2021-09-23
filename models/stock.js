const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    No_: String,
    Description: String,
    SearchDescription: String,
    ProductGroupCode: String,
    UnitPrice: Number,
    Application: String,
    Group: String,
    CMB247:String,
    STORESCMB: String,
    KDY: Number,
    KUG: Number,
    ANP: Number,
    CMB281: Number,
    NEG: Number,
    MTR: Number,
    BAT: Number,
    STOCMB12: Number,
    HO: Number,
    STORES: Number,
})

module.exports = mongoose.model('Stock', stockSchema);