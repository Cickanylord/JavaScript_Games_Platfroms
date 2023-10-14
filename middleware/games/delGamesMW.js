///////////////////////////////////////////////////////////////////
// Delete game from database
///////////////////////////////////////////////////////////////////
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.BD;
        res.locals.games = DB.platforms;
        next();
    };
};