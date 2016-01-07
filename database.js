'use strict';

const Sequelize = require('sequelize');

function Database() {
    let sequelize;
    let models = {};

    this.models = models;;

    this.initialize = function (useMSSQL) {
        sequelize = useMSSQL ? connectToMSSQL() : connectToPostgreSQL();

        initializeModels();

        return syncDatabase();
    };

    function connectToMSSQL() {
        return new Sequelize('SampleDatabase', 'SampleUser', 'SamplePassword', {
            host: '10.211.55.3',
            dialect: 'mssql',
            dialectOptions: {
                instanceName: 'SQLEXPRESS2014'
            }
        });
    }

    function connectToPostgreSQL() {
        return new Sequelize('SampleDatabase', 'SampleUser', 'SamplePassword', {
            host: 'localhost',
            dialect: 'postgres'
        });
    }

    function initializeModels() {
        const SampleModel = sequelize.define('SampleModel', {
            id: {
                autoIncrement: true,
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            point: {
                type: Sequelize.GEOMETRY('POINT'),
                allowNull: false
            }
        });

        models[SampleModel.name] = SampleModel;
    }

    function syncDatabase() {
        return sequelize.sync();
    }
}

module.exports = new Database();