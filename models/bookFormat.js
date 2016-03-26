module.exports = function (sequalize, DataTypes) {
    var BookFormat = sequalize.define('bookFormat', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , field: "id"
        }
        , book: {
            type: DataTypes.INTEGER
            , field: "book"
        }
        , format: {
            type: DataTypes.TEXT
            , field: "format"
        }
        , uncompressed_size: {
            type: DataTypes.INTEGER
            , field: "format"
        }
        , name: {
            type: DataTypes.TEXT
            , field: "name"
        }
    }, {
        tableName: 'data'
        , timestamps: false
    });

    return BookFormat;
};