const express = require('express');
const {startDatabase,isConnected} = require( './db' );
const User = require('./models/user.model')
require('dotenv').config()
const {signUpRouter, LoginRouter, crosshairRouter, updatecrosshair , deletecrosshair,googleRouter,presetRouter,feedbackRouter} = require('./Routes/routes')
const cors  = require( 'cors' )

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json()); 
app.use('/',signUpRouter)
app.use('/',LoginRouter)
app.use('/',presetRouter)
app.use('/',crosshairRouter)
app.use('/',updatecrosshair)
app.use('/',deletecrosshair)
app.use('/',googleRouter)
app.use('/',feedbackRouter)




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