'use strict';

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const handler = require('./ride-handler');

module.exports = (app) => {
    app.get('/health', (req, res) => res.send('Healthy'));

    app.post('/rides', jsonParser, async (req, res) => {
        return handler.handleCreateRide(req, res);
    });

    app.get('/rides', async (req, res) => {
        return handler.handleGetRides(req, res);
    });

    app.get('/rides/:id', async (req, res) => {
        return handler.handleGetRide(req, res);
    });

    return app;
};
