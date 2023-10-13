//////////////////////////////
// renders the view given in viewName parameter
//////////////////////////////

const requireOption = require('./requireOption');

module.exports = function (objectrepository, viewName) {
    return function (req, res) {
        //res.render(viewName, res.tpl);
        console.log('render: ' + viewName);
        res.render(viewName);
    };

};