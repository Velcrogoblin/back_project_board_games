const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;


conn.sync({ alter: true }).then(() => {
	console.log("Hacepta el pull loco");
	console.log("Connecting to the database");
	server.listen(PORT, () => {
		console.log(`Listening at port: ${PORT}`);
	});
});
