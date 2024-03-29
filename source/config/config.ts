import dotenv from 'dotenv';
import logging from './logging';
dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.PORT || 1337;
const APIKEY = process.env.APIKEY || 'myApi';
const KEY_VAULT_NAME = process.env.KEY_VAULT_NAME;
const KEY_VAULT = {
    name: KEY_VAULT_NAME
};
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    apiKey: APIKEY
};

const SQL_CONFIG = {
    userName: process.env.SQL_UserName || 'NOTSET',
    password: process.env.SQL_Password || 'NOTSET',
    server: process.env.SQL_Server || 'NOTSET',
    databaseName: process.env.SQL_DBName || 'NOTSET'
};

const systemConfigs = {
    server: SERVER,
    sql: SQL_CONFIG,
    keyVault: KEY_VAULT
};

function logs() {
    logging.warn('', JSON.stringify(systemConfigs));
}
logs();
export default systemConfigs;
