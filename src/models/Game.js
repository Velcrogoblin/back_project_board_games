const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {


  sequelize.define('game', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.NUMERIC,
      allowNull: false,
    },

    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    players: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
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
      type: DataTypes.NUMERIC,
      allowNull: false,
    },

    playing_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  }, {
    timestamps: false,
  });
};
