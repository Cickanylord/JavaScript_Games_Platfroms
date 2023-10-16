//////////////////////////////
//get games from db
//////////////////////////////

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.DB;
        const gameId = req.params.game_id;


        if (gameId === undefined) {
            res.locals.games = DB.games;
        } else {
            const game = DB.games.find(g => g._id.toString() === gameId.toString());
            if(game === undefined){
                return res.redirect('/games');
            } else {
                res.locals.games = game;
            }
        }
        console.log('games: ' + res.locals.games);
        next();
    };
};