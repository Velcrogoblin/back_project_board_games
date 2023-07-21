const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Purchase",
    {
      purchase_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      description: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },

      total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
        },
      },

      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        // allowNull: false,
        defaultValue: 'Preparing',
      },
    },
    {
      timestamps: false,
    }
  );
};
