module.exports = (sequelize, Sequelize) => {
    const ItemOrder = sequelize.define("itemorders", {
      quantity: {
        type: Sequelize.INTEGER
      },
      inprogress: {
        type: Sequelize.BOOLEAN
      }
    });
    return ItemOrder;
  };