const { DataTypes } = require("sequelize");

// Nationalities y states se van, agregar categories
module.exports = (sequelize) => {
  sequelize.define(
    "Game",
    {
      game_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      released: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      age: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      players_min: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      players_max: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      rating: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },

      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      image: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      weight: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
      },

      playing_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
