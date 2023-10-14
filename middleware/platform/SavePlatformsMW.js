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
            console.log('itt: ' +req.body.platformName);
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


        objectrepository.DB.platforms.push(platform);
        console.log(platform);
        return res.redirect('/');



    };
};