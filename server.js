const express = require('express');
const app = express();
const port = 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Full Stack Magic Unleashed! Server conquering PORT: 💻✨ ${port}`);
  });
}

app.get('/', (req, res) => {
    res.send('Home');
  });
  
  app.get('/nextpage', (req, res) => {
    res.send('Welcome!!');
  });
  

module.exports = app;