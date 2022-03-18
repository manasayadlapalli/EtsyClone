module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
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
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      price: {
        type: Sequelize.INTEGER
      }
    });
    return Item;
  };