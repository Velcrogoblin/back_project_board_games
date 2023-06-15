const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Nationalities", {
    nationalities_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
