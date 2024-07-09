
const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3000;



server.set('port', process.env.PORT || 3000);

  conn.sync({ force: true })
  .then(() => {
    server.listen(server.get('port'), () => {
      console.log(`Base de datos sincronizada. Server listening on port ${PORT}`);
    });
  })
  .catch(error => console.error("Error al sincronizar la base de datos:", error));
  
  



