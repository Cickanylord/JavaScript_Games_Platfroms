///////////////////////////////////////////////////////////////////
// Delete game from database
///////////////////////////////////////////////////////////////////
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.DB;
        const platformId = req.params.game_id;

        if (platformId !== undefined) {
            DB.games = DB.games.filter(game => game._id.toString() !== platformId.toString());
        }
        return res.redirect('/games');
    };
};