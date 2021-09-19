'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const logger = require('./utils/logger');

module.exports = (dbCon) => {
    app.get('/health', (req, res) => res.send('Healthy'));

    app.post('/rides', jsonParser, async (req, res) => {
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;

        if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
            const errorMsg = 'Start latitude and longitude must be between -90 to 90 and -180 to 180 degrees respectively';
            logger.error(errorMsg);
            return res.status(400).send({
                error_code: 'VALIDATION_ERROR', message: errorMsg
            });
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            const errorMsg = 'End latitude and longitude must be between -90 to 90 and -180 to 180 degrees respectively';
            logger.error(errorMsg);
            return res.status(400).send({
                error_code: 'VALIDATION_ERROR', message: errorMsg
            });
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            const errorMsg = 'Rider name must be a non empty string';
            logger.error(errorMsg);
            return res.status(400).send({
                error_code: 'VALIDATION_ERROR', message: errorMsg
            });
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            const errorMsg = 'Driver name must be a non empty string';
            logger.error(errorMsg);
            return res.status(400).send({
                error_code: 'VALIDATION_ERROR', message: errorMsg
            });
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            const errorMsg = 'Driver vehicle must be a non empty string';
            logger.error(errorMsg);
            return res.status(400).send({
                error_code: 'VALIDATION_ERROR', message: errorMsg
            });
        }

        let values = [
            req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long,
            req.body.rider_name, req.body.driver_name, req.body.driver_vehicle
        ];

        try {
            const lastId = await dbCon.run(
                `
                INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `, values);
            const rows = await dbCon.all('SELECT * FROM Rides WHERE rideID = ?', lastId);

            res.send(rows);
        } catch (err) {
            logger.error(err.message);
            return res.status(500).send({
                error_code: 'SERVER_ERROR', message: 'Unknown error'
            });
        }
    });

    app.get('/rides', async (req, res) => {
        const limit = Number(req.query.limit);
        const page = Number(req.query.page);

        let values = [limit, (page - 1)];

        try {
            const rows = await dbCon.all('SELECT * FROM Rides LIMIT ? OFFSET ?', values);

            if (rows.length === 0) {
                const errorMsg = 'Could not find any rides';
                logger.error(errorMsg);
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR', message: errorMsg
                });
            }

            res.send(rows);
        } catch (err) {
            logger.error(err.message);
            return res.status(500).send({
                error_code: 'SERVER_ERROR', message: 'Unknown error'
            });
        }
    });

    app.get('/rides/:id', async (req, res) => {
        try {
            const rows = await dbCon.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`);

            if (rows.length === 0) {
                const errorMsg = 'Could not find any rides';
                logger.error(errorMsg);
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR', message: errorMsg
                });
            }

            res.send(rows);
        } catch (err) {
            logger.error(err.message);
            return res.status(500).send({
                error_code: 'SERVER_ERROR', message: 'Unknown error'
            });
        }
    });

    return app;
};
