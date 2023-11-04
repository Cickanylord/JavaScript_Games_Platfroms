////////////////////////////////////////////
//save platform to db
////////////////////////////////////////////

const requireOption = require('../requireOption');
const PlatformModel = require("../../models/platform");

module.exports = function (objectrepository) {
    return function (req, res, next) {
        //const DB = objectrepository.DB;
        const PlatformModel = requireOption(objectrepository, 'PlatformModel');
        const platformId = req.params.platform_id;

        if ((typeof req.body.platformName === 'undefined') ||
            (typeof req.body.manufacturer === 'undefined') ||
            (typeof req.body.controllerCount === 'undefined') ||
            (typeof req.body.manufactureDate === 'undefined')) {
            return next();
        }

        if (typeof res.locals.platform === 'undefined') {
            res.locals.platform = new PlatformModel();
        }

        res.locals.platform.Platform_Name = req.body.platformName.toString();
        res.locals.platform.Manufacturer = req.body.manufacturer.toString();
        res.locals.platform.Manufacture_Date = req.body.manufactureDate.toString();
        res.locals.platform.No_of_Controllers = req.body.controllerCount.toString();

        if(platformId !== undefined) {
            res.locals.platform.save().then(() => {
                console.log("siker");
                return res.redirect('/');
            }).catch(err => {
                console.log(err);
                next(err);
            });
        }

        /*
        const platformId = req.params.platform_id;
        if (platformId !== undefined) {
            platform._id = platformId;
            DB.platforms = DB.platforms.filter(p => p._id.toString() !== platformId.toString());
            //next();
        }


         */
    };
};