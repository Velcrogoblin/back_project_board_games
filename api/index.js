const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

conn.sync({ alter: true }).then(() => {
  console.log("\tHaseta el pull loco\n");
  console.log("\t------------------\n");
  console.log("Connecting to the database");
  server.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
  });
});
