const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;
// const { getUsers } = require("./src/helper/fillDb");

conn.sync({ alter: true }).then(() => {
  console.log("Connecting to the database");
  // console.log("Filling db");
  // getUsers();
  console.log("Erik dejame hacer un force: true");
  server.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
  });
});
