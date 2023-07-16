const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

conn
  .sync({ force: false })
  .then(() => {
    console.log("Connecting to the database");
    console.log("Erik dejame hacer un force: true");
    server.listen(PORT, () => {
      console.log(`Listening at port: ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
