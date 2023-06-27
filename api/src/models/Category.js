const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Category",
    {
      category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
