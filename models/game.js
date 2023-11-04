const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Game = db.model('Game', {
    Title: String,
    Developer: String,
    DLC: String,
    Release_Date: String,

    _Platform: {
        type: Schema.Types.ObjectId,
        ref: 'Platform'
    }
});

module.exports = Game;