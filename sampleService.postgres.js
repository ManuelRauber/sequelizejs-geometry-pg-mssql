'use strict';

function SampleServicePostgreSQL(model) {
    this.create = function (point) {
        return model.create({
            point: point
        });
    };

    this.getAround = function (latitude, longitude) {
        const query = `
SELECT
    "id", "createdAt", ST_Distance_Sphere(ST_MakePoint(:latitude, :longitude), "point") AS distance
FROM
    "SampleModels"
WHERE
    ST_Distance_Sphere(ST_MakePoint(:latitude, :longitude), "point") < :maxDistance
`;
        
        return model.sequelize.query(query, {
            replacements: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                maxDistance: 10 * 1000
            },
            type: model.sequelize.QueryTypes.SELECT
        });
    };
}

module.exports = SampleServicePostgreSQL;