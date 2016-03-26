 
module.exports = function (sequalize, DataTypes) {
    var Series = sequalize.define('series', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , field: "id"
        }
        , name: {
            type: DataTypes.TEXT
            , field: "name"
        }
        , sort: {
            type: DataTypes.TEXT
            , field: "sort"
        }

    }, {
        tableName: 'series'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                models.series.belongsToMany(models.book, {
                    as: 'books'
                    , through: models.bookSeries
                    , foreignKey: "series"
                    , otherKey: "book"
                });
            }
        }
    });

    return Series;
};