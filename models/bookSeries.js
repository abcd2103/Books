module.exports = function (sequalize, DataTypes) {
    var BookSeries = sequalize.define('bookSeries', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , field: "id"
        }
        , book: {
            type: DataTypes.INTEGER
            , field: "book"
        }
        , series: {
            type: DataTypes.INTEGER
            , field: "series"
        }
    }, {
        tableName: 'books_series_link'
        , timestamps: false
    });

    return BookSeries;
};