const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Faq",
    {
      faq_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      answer: {
        type: DataTypes.TEXT,
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
