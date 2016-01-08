'use strict';

const database = require('./database'),
    Service = require('./sampleService');

let service;

database.initialize(false)
    .then(() => {
        service = new Service(database);

        return service.create(49.019994, 8.413086);
    })
    .then(() => {
        return service.getAround(49.013626, 8.404480);
    })
    .then(result => {
        console.log(result);
    });