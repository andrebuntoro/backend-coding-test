'use strict';

import * as express from 'express';

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

import handler from './ride-handler';

export const register = (app: express.Application): express.Application => {
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
