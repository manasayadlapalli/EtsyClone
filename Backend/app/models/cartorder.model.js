module.exports = (sequelize, Sequelize) => {
    const CartOrders = sequelize.define("cartorders", {
      currency: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
    });
    return CartOrders;
};