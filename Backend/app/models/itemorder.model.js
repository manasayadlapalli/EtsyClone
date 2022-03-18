module.exports = (sequelize, Sequelize) => {
    const ItemOrder = sequelize.define("itemorders", {
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      inprogress: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
    return ItemOrder;
  };