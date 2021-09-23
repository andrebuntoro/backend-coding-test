import dbCon from '../db/connection';
import RideModel from '../model/ride';

const insertRide = async (model: RideModel): Promise<Array<any>> => {
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

const getRides = async (limit: number, page: number):Promise<Array<any>> => {
    const values = [limit, (page - 1) * limit];

    try {
        const rows = await dbCon.all('SELECT * FROM Rides LIMIT ? OFFSET ?', values);
        return rows;
    } catch (err) {
        throw err;
    }
};

const getRide = async (rideId: number):Promise<Array<any>> => {
    const values = [rideId];

    try {
        const rows = await dbCon.all('SELECT * FROM Rides WHERE rideID = ?', values);
        return rows;
    } catch (err) {
        throw err;
    }
};

export default {
    insertRide,
    getRides,
    getRide
};
