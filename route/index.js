const renderMW = require('../middleware/renderMW');
const getPlatformsMW = require('../middleware/platform/getPlatformsMW');
const SavePlatformsMW = require('../middleware/platform/SavePlatformsMW');
const delPlatformsMW = require('../middleware/platform/delPlatformsMW');

const getGamesMW = require('../middleware/games/getGamesMW');
const SaveGameMW = require('../middleware/games/SaveGameMW');
const delGamesMW = require('../middleware/games/delGamesMW');

const GameModel = require('../models/game');
const PlatformModel = require('../models/platform');

module.exports = function (app) {

    const objRepo = {
        DB: {
            platforms: [{_id:1, PlatformName: "PSP", manufacturer: "Sony",controllerCount: "1" ,manufactureDate: '2016-10-14' },
                        {_id:14, PlatformName: "PS4", manufacturer: "Sony",controllerCount: "3" ,manufactureDate:'2023-10-14' }],
            games :[{_id: 1,platformID: 1,title: 'The Legend of Zelda: Breath of the Wild', platform: 'Nintendo Switch', developer: 'Nintendo', dlc: 'Yes', releaseDate: '2017-03-03'},
                    {_id: 2,platformID: 14,title: 'Super Mario Odyssey', platform: 'Nintendo Switch', developer: 'Nintendo', dlc: 'Yes', releaseDate: '2007-09-03'},
                    {_id: 3,platformID: 1,title: 'Horizon Zero Dawn', platform: 'PS4', developer: 'Guerrilla Games', dlc: 'Yes', releaseDate: '2012-12-26'}]
        }

        ,
        GameModel: GameModel,
        PlatformModel: PlatformModel
    };

    platform = new PlatformModel();




    /////////////////////////////////
    //platforms
    /////////////////////////////////
    app.get('/',
        getPlatformsMW(objRepo),
        renderMW(objRepo, 'index'));

    app.use('/platforms/edit/:platform_id',
        getPlatformsMW(objRepo),
        SavePlatformsMW(objRepo),
        renderMW(objRepo, 'add_platform'));

    app.use('/platforms/new',
        SavePlatformsMW(objRepo),
        renderMW(objRepo, 'add_platform'));

    app.get('/platforms/delete/:platform_id',
        getGamesMW(objRepo),
        getPlatformsMW(objRepo),
        delPlatformsMW(objRepo));


    /////////////////////////////////
    //individual platforms
    /////////////////////////////////
    app.get('/platform/games/:platform_id',
        getGamesMW(objRepo),
        renderMW(objRepo, 'game'));

    app.use('/Platform/edit/:platform_id/:game_id',
        getGamesMW(objRepo),
        SaveGameMW(objRepo),
        renderMW(objRepo, 'edit_game'));

    app.use('/Platform/new/:platform_id',
        SaveGameMW(objRepo),
        renderMW(objRepo, 'add_game'));


    app.get('/Platform/delete/:platform_id/:game_id',
        delGamesMW(objRepo),
        renderMW(objRepo, 'add_platform'));

    /////////////////////////////////
    //games
    /////////////////////////////////
    app.get('/games',
        getGamesMW(objRepo),
        renderMW(objRepo, 'game'));

    app.use('/games/edit/:game_id',
        getGamesMW(objRepo),
        SaveGameMW(objRepo),
        renderMW(objRepo, 'add_game'));

    app.use('/games/new',
        getPlatformsMW(objRepo),
        SaveGameMW(objRepo),
        renderMW(objRepo, 'add_game'));

    app.get('/games/delete/:game_id',
        getGamesMW(objRepo),
        delGamesMW(objRepo));


};