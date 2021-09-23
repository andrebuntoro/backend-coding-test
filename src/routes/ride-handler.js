const logger = require('../utils/logger');
const decrypt = require('../utils/decrypt');

const ride = require('../service/ride');
const validation = require('../service/validation');

const handleCreateRide = async (req, res) => {
    const data = JSON.parse(decrypt.decrypt(req.body.data));

    const param = {
        startLatitude: Number(data.start_lat),
        startLongitude: Number(data.start_long),
        endLatitude: Number(data.end_lat),
        endLongitude: Number(data.end_long),
        riderName: data.rider_name,
        driverName: data.driver_name,
        driverVehicle: data.driver_vehicle
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
