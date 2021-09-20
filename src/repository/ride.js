const dbCon = require('../db/connection');

const insertRide = async (model) => {
    const values = [
        model.startLatitude, model.startLongitude, model.endLatitude, model.endLongitude,
        model.riderName, model.driverName, model.driverVehicle
    ];

    try {
        const lastId = await dbCon.run(
            `
            INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `, values);
        const rows = await dbCon.all('SELECT * FROM Rides WHERE rideID = ?', lastId);
        return rows;
    } catch (err) {
        throw err;
    }
};

const getRides = async (limit, page) => {
    const values = [limit, (page - 1) * limit];

    try {
        const rows = await dbCon.all('SELECT * FROM Rides LIMIT ? OFFSET ?', values);
        return rows;
    } catch (err) {
        throw err;
    }
};

const getRide = async (rideId) => {
    try {
        const rows = await dbCon.all('SELECT * FROM Rides WHERE rideID = ?', rideId);
        return rows;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    insertRide,
    getRides,
    getRide
};
