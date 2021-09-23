'use strict';

const port = 8010;

import logger from './src/utils/logger';
import dbCon from './src/db/connection';
import express from 'express';

import * as rideRoutes from './src/routes/ride-route';

const main = async () => {
    try {
        await dbCon.init();

        const app = express();
        rideRoutes.register(app);

        app.listen( port, () => {
            const msg = `App started and listening on port ${port}`;
            console.log(msg);
            logger.info(msg);
        });
    } catch (err: any) {
        const msg = 'Error occured, please check logs for more details \n';
        console.log(msg);
        logger.info(msg);
        logger.error(err.message);
    }
};

main();
