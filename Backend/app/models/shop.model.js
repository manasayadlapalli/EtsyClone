module.exports = (sequelize, Sequelize) => {
    const Shop = sequelize.define("shop", {
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      salescount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
    return Shop;
  };