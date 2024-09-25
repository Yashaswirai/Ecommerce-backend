const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");
const mongodbUri = config.get("MONGODB_URI").replace('${MONGODB_PASSWORD}', process.env.MONGODB_PASSWORD);
mongoose.connect(`${mongodbUri}/majorProject`)
.then(function(){ dbgr("connected")})
.catch(function(err) {dbgr("Error connecting", err)});

module.exports = mongoose.connection;