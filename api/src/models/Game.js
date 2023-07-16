const { DataTypes } = require("sequelize");

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
        defaultValue: [
          "https://res.cloudinary.com/dwqp5iaqw/image/upload/v1689282470/boduDefaultImg_n0nim4.jpg",
        ],
      },

      weight: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
      },

      playing_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      on_sale: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
