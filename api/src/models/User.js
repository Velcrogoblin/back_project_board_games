const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      province: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      street_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      apartment_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      wish_list: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
        defaultValue: [],
      },

      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      review_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
