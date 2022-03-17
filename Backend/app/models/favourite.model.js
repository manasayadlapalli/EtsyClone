module.exports = (sequelize, Sequelize) => {
    const Favourite = sequelize.define("favourites", {
      count: {
          type: Sequelize.INTEGER
      },
    });
    return Favourite;
};