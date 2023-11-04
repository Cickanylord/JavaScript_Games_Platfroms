//////////////////////////////
//get games from db
//////////////////////////////

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.DB;
        const gameId = req.params.game_id;
        const GameModel = requireOption(objectrepository, 'GameModel');
        const platformId = req.params.platform_id;

        filter = {};
        if(platformId !== undefined) {
            filter = {_Platform: platformId};
        }


        if (gameId === undefined) {
            GameModel.find(filter).populate('_Platform')
                .then(games => {
                    console.log('more'+games);
                    res.locals.games = games;
                    next();
                }).catch (err => {
                    console.log(err)
                });
        } else {
            GameModel.findById(gameId).populate('_Platform')
                .then(game => {
                    //console.log('id'+games);
                    res.locals.games = game;
                    next();
            }).catch(err => {
                    console.log(err)
                    next(err);
            }
            );
        }
    };
};