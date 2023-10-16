/////////////////////////////////////////////
// Delete platform from database
/////////////////////////////////////////////

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.DB;
        const platformId = req.params.platform_id;

        if(platformId !== undefined) {
            DB.platforms = DB.platforms.filter(p => p._id.toString() !== platformId.toString());
        }
        return res.redirect('/');
    };
};