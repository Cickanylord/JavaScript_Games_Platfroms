////////////////////////////////////////////
//save platform to db
////////////////////////////////////////////

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const DB = objectrepository.DB;


        if ((typeof req.body.platformName === 'undefined') ||
            (typeof req.body.manufacturer === 'undefined') ||
            (typeof req.body.controllerCount === 'undefined') ||
            (typeof req.body.manufactureDate === 'undefined')) {
            return next();
        }

        if (typeof res.locals.platform === 'undefined') {
            res.locals.platform = DB.platform;
        }


        platform= {
            _id: (DB.platforms.length + 1).toString(),
            PlatformName: req.body.platformName.toString(),
            manufacturer: req.body.manufacturer.toString(),
            controllerCount: req.body.controllerCount.toString(),
            manufactureDate: req.body.manufactureDate.toString()

        };

        const platformId = req.params.platform_id;
        if (platformId !== undefined) {
            platform._id = platformId;
            DB.platforms = DB.platforms.filter(p => p._id.toString() !== platformId.toString());
        }


        DB.platforms.push(platform);
        console.log(platform);
        return res.redirect('/');
    };
};