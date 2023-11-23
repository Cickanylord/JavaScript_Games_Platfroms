/////////////////////////////////////////////
// Save a game to the database
/////////////////////////////////////////////

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.DB;
        const GameModel = requireOption(objectrepository, 'GameModel');
        const platformId = req.params.platform_id;

        res.locals.newGame = typeof platformId !== 'undefined';
        if ((typeof req.body.title === 'undefined') ||
            (typeof req.body.developer === 'undefined') ||
            (typeof req.body.dlc === 'undefined') ||
            (typeof req.body.releaseDate === 'undefined')) {
            return next();
        }

        if (typeof res.locals.games === 'undefined') {
            res.locals.games = new GameModel();
            if (res.locals.newGame) {
                res.locals.games._Platform = res.locals.platforms;
                res.locals.games.newGame = true;
            }
        }
        res.locals.games.Title = req.body.title.toString();
        res.locals.games.Developer = req.body.developer.toString();
        res.locals.games.DLC = req.body.dlc.toString();
        res.locals.games.Release_Date = req.body.releaseDate.toString();


        if(typeof res.locals.games._Platform === 'undefined') {
            res.locals.games._Platform = req.body.platform.toString();
        }


        res.locals.games.save().then(() => {
            //console.log('release: ' + req.body.platform.toString());
            console.log("siker: "+platformId);
            if(platformId !== undefined) {
                return res.redirect('/platform/games/'+platformId);
            }
            return res.redirect('/Games');
        }).catch(err => {
            console.log(err);
            next(err);
        });

    };
};