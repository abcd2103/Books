module.exports = function (sequalize, DataTypes) {
    var Book = sequalize.define('book', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , field: "id"
        }
        , title: {
            type: DataTypes.TEXT
            , field: "title"
        }
        , sort: {
            type: DataTypes.TEXT
            , field: "sort"
        }
        , timestamp: {
            type: DataTypes.DATE
            , field: "timestamp"
        }
        , pubdate: {
            type: DataTypes.DATE
            , field: "pubdate"
        }
        , seriesIndex: {
            type: DataTypes.DECIMAL
            , field: "series_index"
        }
        , authorSort: {
            type: DataTypes.TEXT
            , field: "author_sort"
        }
        , isbn: {
            type: DataTypes.TEXT
            , field: "isbn"
        }
        , lccn: {
            type: DataTypes.TEXT
            , field: "lccn"
        }
        , path: {
            type: DataTypes.TEXT
            , field: "path"
        }
        , flags: {
            type: DataTypes.INTEGER
            , field: "flags"
        }
        , uuid: {
            type: DataTypes.TEXT
            , field: "uuid"
        }
        , hasCover: {
            type: DataTypes.BOOLEAN
            , field: "has_cover"
        }
    }, {
        tableName: 'books'
        , createdAt: false
        , updatedAt: "last_modified"
        , deletedAt: false
        , classMethods: {
            associate: function (models) {
                models.book.belongsToMany(models.author, {
                    as: "authors"
                    , through: models.bookAuthor
                    , foreignKey: "book"
                    , otherKey: "author"
                    , required: false
                });
                models.book.belongsToMany(models.series, {
                    as: "series"
                    , through: models.bookSeries
                    , foreignKey: "book"
                    , otherKey: "series"
                    , required: false
                });
                models.book.hasMany(models.bookFormat, {
                    as: "formats"
                    , foreignKey: "book"
                    , required: false
                });
            }
        }
    });

    return Book;
};