module.exports = (sequelize, Sequelize) => {
    const UserProfile = sequelize.define("userprofiles", {
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      dateofbirth: {
        type: Sequelize.STRING
      },
      phonenumber: {
        type: Sequelize.STRING
      }
    });
    return UserProfile;
  };