/////////////////////////////////////////////
//gets all platforms from the database
/////////////////////////////////////////////

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.DB;
        const platformId = req.params.platform_id;
        const PlatformModel = requireOption(objectrepository, 'PlatformModel');



        if (platformId === undefined) {
            PlatformModel.find()
                .then(platforms => {
                    res.locals.platforms = platforms;
                   //console.log(platforms)
                    next();
                }).catch (err => {
                    console.log(err)
                });
        } else {
            PlatformModel.findById(platformId)
                .then(platform => {
                    res.locals.platforms = platform;
                    //console.log(platform)
                    next();
                }).catch (err => {
                console.log(err)
            });
        }
        //next();
    };
};