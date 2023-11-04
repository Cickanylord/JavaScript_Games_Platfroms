////////////////////////////////////////////
//save platform to db
////////////////////////////////////////////

const requireOption = require('../requireOption');
const PlatformModel = require("../../models/platform");
const {locals} = require("express/lib/application");

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const PlatformModel = requireOption(objectrepository, 'PlatformModel');
        const platformId = req.params.platform_id;

        if ((typeof req.body.platformName === 'undefined') ||
            (typeof req.body.manufacturer === 'undefined') ||
            (typeof req.body.controllerCount === 'undefined') ||
            (typeof req.body.manufactureDate === 'undefined')) {
            return next();
        }

        if (typeof res.locals.platforms === 'undefined') {

            res.locals.platforms = new PlatformModel();
        }

        res.locals.platforms.Platform_Name = req.body.platformName.toString();
        res.locals.platforms.Manufacturer = req.body.manufacturer.toString();
        res.locals.platforms.Manufacture_Date = req.body.manufactureDate.toString();
        res.locals.platforms.No_of_Controllers = req.body.controllerCount.toString();

        res.locals.platforms.save().then(() => {
            console.log("siker");
            return res.redirect('/');
        }).catch(err => {
            console.log(err);
            next(err);
        });
    };
};