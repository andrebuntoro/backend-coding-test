import logger from '../utils/logger';
import decrypt from '../utils/decrypt';

import ride from '../service/ride';
import validateRideRequest from '../service/validation';
import RideParam from '../param/ride';

const handleCreateRide = async (req: any, res: any): Promise<any> => {
    const data = JSON.parse(decrypt(req.body.data));

    const param: RideParam = {
        startLatitude: Number(data.start_lat),
        startLongitude: Number(data.start_long),
        endLatitude: Number(data.end_lat),
        endLongitude: Number(data.end_long),
        riderName: data.rider_name,
        driverName: data.driver_name,
        driverVehicle: data.driver_vehicle
    };

    try {
        validateRideRequest(param);
    } catch (err: any) {
        logger.error(err.message);
        return res.status(400).send({
            error_code: 'VALIDATION_ERROR', message: err.message
        });
    }

    try {
        const rows = await ride.createRide(param);
        return res.status(200).send(rows);
    } catch (err: any) {
        logger.error(err.message);
        return res.status(500).send({
            error_code: 'SERVER_ERROR', message: 'Unknown error'
        });
    }
};

const handleGetRides = async (req: any, res: any): Promise<any> => {
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
    } catch (err: any) {
        logger.error(err.message);
        return res.status(500).send({
            error_code: 'SERVER_ERROR', message: 'Unknown error'
        });
    }
};

const handleGetRide = async (req: any, res: any): Promise<any> => {
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
    } catch (err: any) {
        logger.error(err.message);
        return res.status(500).send({
            error_code: 'SERVER_ERROR', message: 'Unknown error'
        });
    }
};

export default {
    handleCreateRide,
    handleGetRides,
    handleGetRide
};
