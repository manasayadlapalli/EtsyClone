module.exports = (sequelize, Sequelize) => {
    const Shop = sequelize.define("shops", {
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
        type: Sequelize.STRING
      }
    });
    return Shop;
  };