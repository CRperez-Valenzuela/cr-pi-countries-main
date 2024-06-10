const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Base de datos sincronizada. Server listening on port ${PORT}`);
})
}).catch(error => console.error("Error al sincronizar la base de datos:", error))
