module.exports = function (sequalize, DataTypes) {
    var BookAuthor = sequalize.define('bookAuthor', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , field: "id"
        }
        , book: {
            type: DataTypes.INTEGER
            , field: "book"
        }
        , author: {
            type: DataTypes.INTEGER
            , field: "author"
        }
    }, {
        tableName: 'books_authors_link'
        , timestamps: false
    });

    return BookAuthor;
};