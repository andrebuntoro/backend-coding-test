const validateRideRequest = (param) => {
    if (param.startLatitude < -90 || param.startLatitude > 90 || param.startLongitude < -180 || param.startLongitude > 180) {
        throw new Error('Start latitude and longitude must be between -90 to 90 and -180 to 180 degrees respectively');
    };

    if (param.endLatitude < -90 || param.endLatitude > 90 || param.endLongitude < -180 || param.endLongitude > 180) {
        throw new Error('End latitude and longitude must be between -90 to 90 and -180 to 180 degrees respectively');
    };

    if (typeof param.riderName !== 'string' || param.riderName.length < 1) {
        throw new Error('Rider name must be a non empty string');
    };

    if (typeof param.driverName !== 'string' || param.driverName.length < 1) {
        throw new Error('Driver name must be a non empty string');
    };

    if (typeof param.driverVehicle !== 'string' || param.driverVehicle.length < 1) {
        throw new Error('Driver vehicle must be a non empty string');
    };
};

module.exports = {
    validateRideRequest
};
