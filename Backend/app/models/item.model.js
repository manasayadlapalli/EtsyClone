module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      availablecount: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      }
    });
    return Item;
  };