 
module.exports = function (sequalize, DataTypes) {
    var Author = sequalize.define('author', {
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
        , link: {
            type: DataTypes.TEXT
            , field: "link"
        }
    }, {
        tableName: 'authors'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                models.author.belongsToMany(models.book, {
                    as: 'books'
                    , through: models.bookAuthor
                    , foreignKey: "author"
                    , otherKey: "book"
                });
            }
        }
    });

    return Author;
};