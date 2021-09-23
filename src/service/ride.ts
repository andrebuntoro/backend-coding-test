import repository from '../repository/ride';
import RideParam from '../param/ride';

const createRide = async (param: RideParam): Promise<Array<any>> => {
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

const getRides = async (limit: number, page: number): Promise<Array<any>> => {
    const rows = await repository.getRides(limit, page);
    return rows;
};

const getRide = async (rideId: number): Promise<Array<any>> => {
    const rows = await repository.getRide(rideId);
    return rows;
};

export default {
    createRide,
    getRides,
    getRide
};
