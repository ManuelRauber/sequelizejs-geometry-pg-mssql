'use strict';

function SampleServiceMSSQL(model) {
    this.create = function (point) {
        const query = `
INSERT INTO [SampleModels]
    (
        [point],
        [createdAt],
        [updatedAt]
    )
VALUES
    (
        geometry::Point(${point.coordinates[0]}, ${point.coordinates[1]}, 0),
        ?,
        ?
    )`;
        
        return model.sequelize.query(query, {
            replacements: [
                new Date().toISOString(),
                new Date().toISOString()
            ],
            model: model,
            type: model.sequelize.QueryTypes.INSERT
        });
    };

    this.getAround = function (latitude, longitude) {
        const maxDistance = 10 * 1000;
        const earthMeanRadius = 6370986 * Math.PI / 180;

        const query = `
SELECT
    [id], [createdAt], [point].STDistance(geometry::Point(?, ?, 0)) * ? AS distance
FROM
    [SampleModels]
WHERE
    [point].STDistance(geometry::Point(?, ?, 0)) * ? < ?
        `;

        return model.sequelize.query(query, {
            replacements: [
                latitude,
                longitude,
                earthMeanRadius,
                latitude,
                longitude,
                earthMeanRadius,
                maxDistance
            ],
            type: model.sequelize.QueryTypes.SELECT
        });
    };
}

module.exports = SampleServiceMSSQL;