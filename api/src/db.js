require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;

const sequelize = new Sequelize(
  // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  DB_DEPLOY,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  Designer,
  Editorial,
  Language,
  Game,
  Category,
  Mechanic,
  Thematic,
  Author,
  User,
  Purchase,
  Role,
  ShippingAddress,
  Review,
} = sequelize.models;

Game.belongsToMany(Category, { through: "GameCategory", timestamps: false });
Category.belongsToMany(Game, { through: "GameCategory", timestamps: false });

Game.belongsToMany(Thematic, { through: "GameThematic", timestamps: false });
Thematic.belongsToMany(Game, { through: "GameThematic", timestamps: false });

Game.belongsToMany(Mechanic, { through: "GameMechanic", timestamps: false });
Mechanic.belongsToMany(Game, { through: "GameMechanic", timestamps: false });

Game.belongsToMany(Designer, { through: "GameDesigner", timestamps: false });
Designer.belongsToMany(Game, { through: "GameDesigner", timestamps: false });

Game.belongsToMany(Language, { through: "GameLanguage", timestamps: false });
Language.belongsToMany(Game, { through: "GameLanguage", timestamps: false });

Review.belongsToMany(User, { through: "UserReview", timestamps: false });
User.belongsToMany(Review, { through: "UserReview", timestamps: false });

Game.belongsToMany(Review, { through: "GameReview", timestamps: false });
Review.belongsToMany(Game, { through: "GameReview", timestamps: false });

Game.belongsTo(Editorial);
Editorial.hasMany(Game);

Game.belongsTo(Author);
Author.hasMany(Game);

User.belongsTo(Role);
Role.hasMany(User);

User.belongsTo(ShippingAddress);
ShippingAddress.hasOne(User);

User.hasMany(Purchase, { foreingKey: "user_id" });
Purchase.belongsTo(User, { foreingKey: "user_id" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op,
};
