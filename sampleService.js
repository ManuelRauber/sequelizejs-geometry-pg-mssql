'use strict';

const SampleServiceMSSQL = require('./sampleService.mssql'),
        SampleServicePostgreSQL = require('./sampleService.postgres');

function SampleService(database) {
    const adapter = database.getDialect() === 'mssql'
            ? new SampleServiceMSSQL(database.models.SampleModel)
            : new SampleServicePostgreSQL(database.models.SampleModel);

    this.create = function (latitude, longitude) {
        // Do some input parameter validation

        const point = {
            type: 'Point',
            coordinates: [latitude, longitude]
        };

        return adapter.create(point);
    };

    this.getAround = function (latitude, longitude) {
        // Do some input parameter validation
        return adapter.getAround(latitude, longitude);
    };
}

module.exports = SampleService;