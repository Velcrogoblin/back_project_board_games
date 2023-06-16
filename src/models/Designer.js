const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("designer", {
    designer_id: {
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
      allowNull: false,
    },
  }, {timestamps: false});
};
