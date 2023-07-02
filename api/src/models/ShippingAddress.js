const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ShippingAddress",
    {
      shippingAddress_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      apartment_number: {
        type: DataTypes.STRING
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false,
    }
  );
};