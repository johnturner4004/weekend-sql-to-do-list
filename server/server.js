//imports modules used to set up the server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//imports the routers and pool modules to establish communication between server.js
//and the database
// const taskRouter = require('./routes/task.router.js');
// const pool = require('./modules/pool');

//uses body parser to read data from the client.js file
app.use(bodyParser.urlencoded({extended: true}));

//sets the route to communicate between client.js and the server
// app.use('./task', taskRouter);

//sets up the static server
app.use(express.static('server/public'));

//listens for communication from the server on either port 5000 for local testing and use or a port chosen by the server environment if deployed.
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('listening on port ...', PORT);
})
