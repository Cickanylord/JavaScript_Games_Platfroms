const renderMW = require('../middleware/renderMW');
const getPlatformsMW = require('../middleware/platform/getPlatformsMW');
const SavePlatformsMW = require('../middleware/platform/SavePlatformsMW');
const delPlatformsMW = require('../middleware/platform/delPlatformsMW');

const getGamesMW = require('../middleware/games/getGamesMW');
const getGameMW = require('../middleware/games/getGameMW');
const SaveGameMW = require('../middleware/games/SaveGameMW');
const delGamesMW = require('../middleware/games/delGamesMW');

module.exports = function (app) {
    const objRepo = {};

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
        getPlatformsMW(objRepo));


    /////////////////////////////////
    //individual platforms
    /////////////////////////////////
    app.get('/platform/games/:platform_id',
        getGamesMW(objRepo),
        renderMW(objRepo, 'view_platform'));

    app.use('/Platform/edit/:platform_id/:game_id',
        getGameMW(objRepo),
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
        getGameMW(objRepo),
        SaveGameMW(objRepo),
        renderMW(objRepo, 'add_game'));

    app.use('/games/new',
        SaveGameMW(objRepo),
        renderMW(objRepo, 'add_game'));

    app.get('/games/delete/:game_id',
        getGameMW(objRepo),
        delGamesMW(objRepo));


};