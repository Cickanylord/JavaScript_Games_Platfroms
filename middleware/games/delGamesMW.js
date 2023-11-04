///////////////////////////////////////////////////////////////////
// Delete game from database
///////////////////////////////////////////////////////////////////
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const GameModel = requireOption(objectrepository, 'GameModel');
        const gameId = req.params.game_id;

        if(res.locals.games._id.toString() === gameId.toString()) {
            res.locals.games.deleteOne().then(() => {
                console.log('deleted');
                return res.redirect('/games');
            }).catch (err => {
                console.log(err);
                return res.redirect('/games');
            });
        }

    };
};