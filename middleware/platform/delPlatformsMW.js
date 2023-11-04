/////////////////////////////////////////////
// Delete platform from database
/////////////////////////////////////////////

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.DB;
        const platformId = req.params.platform_id;
        const PlatformModel = requireOption(objectrepository, 'PlatformModel');

        if(platformId !== undefined) {
            res.locals.platforms.deleteOne().then(() => {
                console.log('deleted');
                return res.redirect('/');
            }).catch (err => {
                console.log(err);
                return res.redirect('/');
            });
        }

    };
};