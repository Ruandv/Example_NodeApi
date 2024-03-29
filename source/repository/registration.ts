import { Connection, Request, TYPES } from 'tedious';
import systemConfigs from '../config/config';
const config = {
    authentication: {
        options: {
            userName: systemConfigs.sql.userName,
            password: systemConfigs.sql.password
        },
        type: 'default'
    },
    server: systemConfigs.sql.server, // update me
    options: {
        database: systemConfigs.sql.databaseName, //update me
        encrypt: true
    }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('CONNECTED');
    }
});

connection.connect();

const listUserAccounts = (callback: (rows: any[] | undefined) => void) => {
    console.log('Reading rows from the Table...');
    var results: any[] = [];
    // Read all rows from table
    const request = new Request(`Select * from Persons`, (err) => {
        callback(results);
    });

    request.on('row', function (rowObject) {
        results.push(rowObject);
    });

    connection.execSql(request);
};

const authenticateUserAccount = (userName: string, password: string, callback: (error: Error | undefined, rows: any[]) => void) => {
    console.log('Authenticating...' + userName);
    var results: any[] = [];
    const request = new Request(`Select top 1 * from persons where firstName=@name and password = @password`, (err) => {
        callback(err, results);
    });

    request.addParameter('name', TYPES.VarChar, userName);
    request.addParameter('password', TYPES.VarChar, password);
    request.on('row', function (rowObject) {
        // populate the results array
        results.push(rowObject);
    });

    connection.execSql(request);
};

const createUserAccount = (userName: string, password: string, cellNo: string, callback: (error: Error | undefined, rows: any[]) => void) => {
    console.log('Inserting into Table...' + userName);
    var results: any[] = [];
    const request = new Request(`Insert into Persons (FirstName,Password,CellNo) Select @name, @password, @cellNo`, (err) => {
        callback(err, results);
    });

    request.addParameter('name', TYPES.VarChar, userName);
    request.addParameter('password', TYPES.VarChar, password);
    request.addParameter('cellNo', TYPES.VarChar, cellNo);
    request.on('row', function (rowObject) {
        // populate the results array
        results.push(rowObject);
    });

    connection.execSql(request);
};

export { createUserAccount, listUserAccounts, authenticateUserAccount };
