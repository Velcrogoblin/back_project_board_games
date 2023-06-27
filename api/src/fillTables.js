const fs = require("fs");
const axios = require("axios");

const filePath = "./data.json";
const apiUrl = "http://localhost:3001"; // Ruta base de la API

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  try {
    const records = JSON.parse(data);

    records.forEach((record) => {
      const { table, fields } = record;
      const jsonFilePath = `./unique${table}.json`;

      fs.readFile(jsonFilePath, "utf8", (err, jsonData) => {
        if (err) {
          console.error(`Error al leer el archivo JSON ${jsonFilePath}:`, err);
          return;
        }

        try {
          const recordsData = JSON.parse(jsonData);

          recordsData.forEach((data) => {
            const requestBody = {};

            fields.split(",").forEach((field) => {
              requestBody[field] = data[field.trim()];
            });

            console.log(requestBody);

            axios
              .post(`${apiUrl}/${table.toLowerCase()}`, requestBody)
              .then((response) => {
                console.log(
                  `Solicitud POST exitosa para ${table}:`,
                  requestBody
                );
                console.log("Respuesta:", response.data);
              })
              .catch((error) => {
                console.error(
                  `Error al hacer la solicitud POST para ${table}:`,
                  requestBody
                );

                if (error.response) {
                  console.error("Error:", error.response.data);
                } else {
                  console.error("Error:", error.message);
                }
              });
          });
        } catch (error) {
          console.error(
            `Error al analizar el archivo JSON ${jsonFilePath}:`,
            error
          );
        }
      });
    });
  } catch (error) {
    console.error("Error al analizar el archivo JSON:", error);
  }
});
