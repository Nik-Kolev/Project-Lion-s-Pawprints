const { PORT, DB_NAME, DB_CONNECTION, SECRET } = process.env;

module.exports = {
    port: PORT,
    dbConnection: `${DB_CONNECTION}/${DB_NAME}`,
    secret: SECRET
};