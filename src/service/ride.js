const repository = require('../repository/ride');

const createRide = async (param) => {
    const model = {
        startLatitude: param.startLatitude,
        startLongitude: param.startLongitude,
        endLatitude: param.endLatitude,
        endLongitude: param.endLongitude,
        riderName: param.riderName,
        driverName: param.driverName,
        driverVehicle: param.driverVehicle
    };

    const rows = await repository.insertRide(model);
    return rows;
};

const getRides = async (limit, page) => {
    const rows = await repository.getRides(limit, page);
    return rows;
};

const getRide = async (rideId) => {
    const rows = await repository.getRide(rideId);
    return rows;
};

module.exports = {
    createRide,
    getRides,
    getRide
};
