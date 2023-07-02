'use strict';

const Sequelize = require('sequelize');
const config = require("../config");
const User = require('./user');
const db = {};

const sequelize = new Sequelize(config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User(sequelize, Sequelize);

module.exports = db;
