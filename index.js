'use strict';

const port = 8010;

const logger = require('./src/utils/logger');

const dbCon = require('./src/db/connection');

const main = async () => {
    try {
        await dbCon.init();

        const app = require('./src/routes/app')();
        app.listen(port);

        const msg = `App started and listening on port ${port}`;
        console.log(msg);
        logger.info(msg);
    } catch (err) {
        const msg = 'Error occured, please check logs for more details \n';
        console.log(msg);
        logger.info(msg);
        logger.error(err.message);
    }
};

main();
