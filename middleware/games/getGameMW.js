//////////////////////////////
// Get a game from the database by id
//////////////////////////////

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.DB;
        const platformId = req.params.platform_id;

        console.log('platformId: ' + platformId);
        if (platformId === undefined) {
            res.locals.games = DB.games;
        } else {
            console.log('platformId: ' + platformId);
            res.locals.games = DB.games.filter(game => game.platformID.toString() !== platformId.toString());
        }
        next();
    };
};