'use strict';

const request = require('supertest');

const dbCon = require('../src/db/connection');
const encrypt = require('../src/utils/encrypt');
const app = require('../src/routes/app')();

describe('API tests', () => {
    before( async () => {
        await dbCon.init();
    });

    // ======== positive tests below ========

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should return the newly added ride', (done) => {
            const payload = {
                'start_lat': -6.1677,
                'start_long': 106.817562,
                'end_lat': -6.135321,
                'end_long': 106.830567,
                'rider_name': 'Andre',
                'driver_name': 'Kevin',
                'driver_vehicle': 'Tesla Model 3'
            };
            request(app)
                .post('/rides').send(
                    {
                        'data': encrypt.encrypt(JSON.stringify(payload))
                    }
                )
                .expect(200, done);
        });
    });

    describe('GET /rides', () => {
        it('should return list of rides from database', (done) => {
            request(app)
                .get('/rides').query(
                    {
                        'limit': 3,
                        'page': 1
                    }
                )
                .expect(200, done);
        });
    });

    describe('GET /rides', () => {
        it('should return list of rides from database', (done) => {
            request(app)
                .get('/rides').query(
                    {
                        'limit': 5,
                        'page': 10
                    }
                )
                .expect(200, done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return information about the specified ride id', (done) => {
            request(app)
                .get('/rides/1')
                .expect(200, done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return information about the specified ride id', (done) => {
            request(app)
                .get('/rides/null')
                .expect(200, done);
        });
    });

    // ======== negative tests below ========

    describe('POST /rides (invalid start_lat)', () => {
        it('should return validation error for start_lat', (done) => {
            const payload = {
                'start_lat': -116.1677,
                'start_long': 106.817562,
                'end_lat': -6.135321,
                'end_long': 106.830567,
                'rider_name': 'Andre',
                'driver_name': 'Kevin',
                'driver_vehicle': 'Tesla Model 3'
            };
            request(app)
                .post('/rides').send(
                    {
                        'data': encrypt.encrypt(JSON.stringify(payload))
                    }
                )
                .expect(400, done);
        });
    });

    describe('POST /rides (invalid start_long)', () => {
        it('should return validation error for start_long', (done) => {
            const payload = {
                'start_lat': -6.1677,
                'start_long': 206.817562,
                'end_lat': -6.135321,
                'end_long': 106.830567,
                'rider_name': 'Andre',
                'driver_name': 'Kevin',
                'driver_vehicle': 'Tesla Model 3'
            };
            request(app)
                .post('/rides').send(
                    {
                        'data': encrypt.encrypt(JSON.stringify(payload))
                    }
                )
                .expect(400, done);
        });
    });

    describe('POST /rides (invalid end_lat)', () => {
        it('should return validation error for end_lat', (done) => {
            const payload = {
                'start_lat': -6.1677,
                'start_long': 106.817562,
                'end_lat': 186.135321,
                'end_long': 106.830567,
                'rider_name': 'Andre',
                'driver_name': 'Kevin',
                'driver_vehicle': 'Tesla Model 3'
            };
            request(app)
                .post('/rides').send(
                    {
                        'data': encrypt.encrypt(JSON.stringify(payload))
                    }
                )
                .expect(400, done);
        });
    });

    describe('POST /rides (invalid end_long)', () => {
        it('should return validation error for end_long', (done) => {
            const payload = {
                'start_lat': -6.1677,
                'start_long': 106.817562,
                'end_lat': -6.135321,
                'end_long': -886.830567,
                'rider_name': 'Andre',
                'driver_name': 'Kevin',
                'driver_vehicle': 'Tesla Model 3'
            };
            request(app)
                .post('/rides').send(
                    {
                        'data': encrypt.encrypt(JSON.stringify(payload))
                    }
                )
                .expect(400, done);
        });
    });

    describe('POST /rides (invalid rider_name)', () => {
        it('should return validation error for rider_name', (done) => {
            const payload = {
                'start_lat': -6.1677,
                'start_long': 106.817562,
                'end_lat': -6.135321,
                'end_long': 106.830567,
                'rider_name': 0,
                'driver_name': 'Kevin',
                'driver_vehicle': 'Tesla Model 3'
            };
            request(app)
                .post('/rides').send(
                    {
                        'data': encrypt.encrypt(JSON.stringify(payload))
                    }
                )
                .expect(400, done);
        });
    });

    describe('POST /rides (invalid driver_name)', () => {
        it('should return validation error for driver_name', (done) => {
            const payload = {
                'start_lat': -6.1677,
                'start_long': 106.817562,
                'end_lat': -6.135321,
                'end_long': 106.830567,
                'rider_name': 'Andre',
                'driver_name': '',
                'driver_vehicle': 'Tesla Model 3'
            };
            request(app)
                .post('/rides').send(
                    {
                        'data': encrypt.encrypt(JSON.stringify(payload))
                    }
                )
                .expect(400, done);
        });
    });

    describe('POST /rides (invalid driver_vehicle)', () => {
        it('should return validation error for driver_vehicle', (done) => {
            const payload = {
                'start_lat': -6.1677,
                'start_long': 106.817562,
                'end_lat': -6.135321,
                'end_long': 106.830567,
                'rider_name': 'Andre',
                'driver_name': 'Kevin',
                'driver_vehicle': ''
            };
            request(app)
                .post('/rides').send(
                    {
                        'data': encrypt.encrypt(JSON.stringify(payload))
                    }
                )
                .expect(400, done);
        });
    });

    describe('POST /rides (missing start_lat)', () => {
        it('should return validation error for rider_name', (done) => {
            const payload = {
                'start_long': 106.817562,
                'end_lat': -6.135321,
                'end_long': 106.830567,
                'rider_name': 'Andre',
                'driver_name': 'Kevin',
                'driver_vehicle': 'Tesla model 3'
            };
            request(app)
                .post('/rides').send(
                    {
                        'data': encrypt.encrypt(JSON.stringify(payload))
                    }
                )
                .expect(500, done);
        });
    });

    describe('GET /rides (missing limit)', () => {
        it('should return list of rides from database', (done) => {
            request(app)
                .get('/rides').query(
                    {
                        'page': 1
                    }
                )
                .expect(500, done);
        });
    });
});
