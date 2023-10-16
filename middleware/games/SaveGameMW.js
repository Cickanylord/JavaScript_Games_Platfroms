/////////////////////////////////////////////
// Save a game to the database
/////////////////////////////////////////////

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.DB;
        res.locals.platforms = DB.platforms;

        if (typeof res.locals.platforms === 'undefined' && typeof res.locals.games === 'undefined') {
            req.body.platform = res.locals.games.platform;
        }

        if ((typeof req.body.title === 'undefined') ||
            (typeof req.body.developer === 'undefined') ||
            (typeof req.body.dlc === 'undefined') ||
            (typeof req.body.platform === 'undefined') ||
            (typeof req.body.releaseDate === 'undefined')) {
            console.log('itt: ' +req.body.platform);
            return next();
        }

        if (typeof res.locals.games === 'undefined') {
            res.locals.games = DB.games;
        }


        games = {
            _id: (DB.games.length + 1).toString(),
            platformID: req.body.platform,
            title: req.body.title.toString(),
            developer: req.body.developer.toString(),
            platform: req.body.platform.toString(),
            dlc: req.body.dlc.toString(),
            releaseDate: req.body.releaseDate.toString()
        };


        const gameId = req.params.game_id;
        if (gameId !== undefined) {
            games._id = gameId;
            games.platformID = DB.games.find(game => game._id.toString() === gameId.toString()).platformID;

            DB.games = DB.games.filter(game => game._id.toString() !== gameId.toString());
        }


        DB.games.push(games);
        return res.redirect('/games');
    };
};