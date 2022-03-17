module.exports = (sequelize, Sequelize) => {
    const ItemOrder = sequelize.define("itemorders", {
      quantity: {
        type: Sequelize.STRING
      }
    });
    return ItemOrder;
  };