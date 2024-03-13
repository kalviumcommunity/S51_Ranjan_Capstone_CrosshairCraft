const express = require('express');
const {startDatabase,isConnected} = require( './db' );
require('dotenv').config()

const app = express();
const port = 3000;

// if (require.main === module) {
//   app.listen(port, () => {
//     console.log(`🚀 testing Full Stack Magic Unleashed! Server conquering PORT: 💻✨ ${port}`);
//   });
// }


app.get('/', (req, res) => {
  res.json({
    message: 'o_O',
    database: isConnected() ? 'connected' : 'disconnected'
  })
});

  app.get('/nextpage', (req, res) => {
    res.send('Welcome!!');
  });
  
  app.listen(port, async () => {
    await startDatabase();

    console.log(`🚀 Full Stack Magic Unleashed! Server conquering PORT: 💻✨ ${port}`);
  });


module.exports = app;