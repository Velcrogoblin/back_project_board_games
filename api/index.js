const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
  console.log("Connecting to the database");
  server.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
  });
});
