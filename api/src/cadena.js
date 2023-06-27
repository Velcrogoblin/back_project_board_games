const XLSX = require("xlsx");
const fs = require("fs");

// Nombre del archivo Excel
const archivoExcel = "Faqs.xlsx";

// Nombre de la hoja en el archivo Excel
const nombreHoja = "Faqs";

// Leer el archivo Excel
const workbook = XLSX.readFile(archivoExcel);

// Obtener los datos de la hoja específica
const worksheet = workbook.Sheets[nombreHoja];
const datos = XLSX.utils.sheet_to_json(worksheet);

// Convertir los datos a formato JSON con comillas dobles
const json = JSON.stringify(datos, null, 2).replace(/'/g, '"');

// Guardar el JSON en un archivo
fs.writeFileSync("archivo.json", json);

console.log("La conversión a JSON se completó correctamente.");
