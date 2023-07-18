const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;
const {getUsers} = require("./src/helper/fillDb.js")
conn
  .sync({ force: false })
  .then(() => {
    //getUsers()
    console.log("Connecting to the database");
    server.listen(PORT, () => {
      console.log(`Listening at port: ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
