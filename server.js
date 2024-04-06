const express = require('express');
const {startDatabase,isConnected} = require( './db' );
const User = require('./models/user.model')
require('dotenv').config()
const {signUpRouter, LoginRouter, crosshairRouter, updatecrosshair , deletecrosshair} = require('./Routes/routes')
const cors  = require( 'cors' )
// const passport = require('passport')
// const session = require('express-session')
// const GoogleStrategy = require('passport-google-oauth20').Strategy;




const app = express();
const port = 3000;

app.use(cors())
app.use(express.json()); 
app.use('/',signUpRouter)
app.use('/',LoginRouter)
app.use('/',crosshairRouter)
app.use('/',updatecrosshair)
app.use('/',deletecrosshair)



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