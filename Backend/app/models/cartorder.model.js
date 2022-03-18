module.exports = (sequelize, Sequelize) => {
    const CartOrders = sequelize.define("cartorder", {
      currency: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
    });
    return CartOrders;
};