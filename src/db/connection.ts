import createSchemas from './schemas';
import * as sqlite3 from 'sqlite3';

const sql = sqlite3.verbose();

/** Connection class for sqlite3 related operations purpose */
class Connection {
    db: any;

    /**
     * Creates a sqlite3 in memory database
     */
    constructor() {
        this.db = new sql.Database(':memory:');
    }

    /**
     * Creates defined required schemas in the database
     * @return {Promise} a Promise object that represents successful creation a schemas
     */
    init(): Promise<any> {
        return new Promise<void>((resolve, reject) => {
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
    run(query: string, params: Array<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (this: any, err: any) {
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
    all(query: string, params: Array<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err: any, rows: any) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}

const dbCon = new Connection();

export default dbCon;
