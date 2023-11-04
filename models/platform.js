const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Platform = db.model('Platform', {
    Platform_Name: String,
    Manufacturer: String,
    Manufacture_Date: String,
    No_of_Controllers: String
});

module.exports = Platform;