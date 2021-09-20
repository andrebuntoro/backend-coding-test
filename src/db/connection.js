const sqlite3 = require('sqlite3').verbose();
const createSchemas = require('./schemas');

/** Connection class for sqlite3 related operations purpose */
class Connection {
    /**
     * Creates a sqlite3 in memory database
     */
    constructor() {
        this.db = new sqlite3.Database(':memory:');
    }

    /**
     * Creates defined required schemas in the database
     * @return {Promise} a Promise object that represents successful creation a schemas
     */
    init() {
        return new Promise((resolve, reject) => {
            this.db.serialize(async () => {
                try {
                    await this.run(createSchemas, []);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    /**
     * Executes a query with given parameters in the database
     * @param {string} query
     * @param {object} params
     * @return {Promise} a Promise object that represents the lastID that was inserted in the database
     */
    run(query, params) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });
    }

    /**
     * Executes a query with given parameters in the database
     * @param {string} query
     * @param {object} params
     * @return {Promise} a Promise object that represents list of entries in the database
     */
    all(query, params) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}

const dbCon = new Connection();

module.exports = dbCon;
