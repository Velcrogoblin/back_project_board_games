const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Language",
    {
      id_language: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      language_name: {
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
