const logger = require('../utils/logger');

const ride = require('../service/ride');
const validation = require('../service/validation');

const handleCreateRide = async (req, res) => {
    const param = {
        startLatitude: Number(req.body.start_lat),
        startLongitude: Number(req.body.start_long),
        endLatitude: Number(req.body.end_lat),
        endLongitude: Number(req.body.end_long),
        riderName: req.body.rider_name,
        driverName: req.body.driver_name,
        driverVehicle: req.body.driver_vehicle
    };

    try {
        validation.validateRideRequest(param);
    } catch (err) {
        logger.error(err.message);
        return res.status(400).send({
            error_code: 'VALIDATION_ERROR', message: err.message
        });
    }

    try {
        const rows = await ride.createRide(param);
        return res.status(200).send(rows);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send({
            error_code: 'SERVER_ERROR', message: 'Unknown error'
        });
    }
};

const handleGetRides = async (req, res) => {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);

    try {
        const rows = await ride.getRides(limit, page);

        if (rows.length === 0) {
            const errorMsg = 'Could not find any rides';
            logger.error(errorMsg);
            return res.send({
                error_code: 'RIDES_NOT_FOUND_ERROR', message: errorMsg
            });
        }

        return res.status(200).send(rows);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send({
            error_code: 'SERVER_ERROR', message: 'Unknown error'
        });
    }
};

const handleGetRide = async (req, res) => {
    const rideId = Number(req.params.id);

    try {
        const rows = await ride.getRide(rideId);

        if (rows.length === 0) {
            const errorMsg = 'Could not find any rides';
            logger.error(errorMsg);
            return res.send({
                error_code: 'RIDES_NOT_FOUND_ERROR', message: errorMsg
            });
        }

        return res.status(200).send(rows);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send({
            error_code: 'SERVER_ERROR', message: 'Unknown error'
        });
    }
};

module.exports = {
    handleCreateRide,
    handleGetRides,
    handleGetRide
};
