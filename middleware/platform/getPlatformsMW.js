/////////////////////////////////////////////
//gets all platforms from the database
/////////////////////////////////////////////

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.DB;
        const platformId = req.params.platform_id;

        if (platformId === undefined) {
            res.locals.platforms = DB.platforms;
        } else {
            const platform = DB.platforms.find(p => p._id.toString() === platformId.toString());
            if (platform === undefined) {
                return res.redirect('/');
            } else {
                res.locals.platforms = platform;
            }
        }
        console.log('platforms: ' + res.locals.platforms);
        next();
    };
};