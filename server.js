const express = require('express');
const {startDatabase,isConnected} = require( './db' );
require('dotenv').config()
const {signUpRouter, LoginRouter} = require('./Routes/routes')

const app = express();
const port = 3000;

app.use(express.json()); 
app.use('/',signUpRouter)
app.use('/',LoginRouter)

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