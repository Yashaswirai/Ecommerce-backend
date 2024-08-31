const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/majorProject`)
.then(function(){ dbgr("connected")})
.catch(function(err) {dbgr("Error connecting", err)});

module.exports = mongoose.connection;