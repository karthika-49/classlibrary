const dotenv = require("dotenv");

dotenv.config({path:".env"});

const username = process.env.DB_USERNAME;
const pwd = process.env.DB_PASSWORD;
const dbname = process.env.DB_NAME;
console.log(username,pwd, dbname)
const mongodbURI = `mongodb+srv://${username}:${pwd}@${dbname}.kii0byq.mongodb.net/?retryWrites=true&w=majority`;
module.exports = mongodbURI;
