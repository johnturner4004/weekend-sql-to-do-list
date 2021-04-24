const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
  let sqlText = `SELECT * FROM "list";`;
  pool.query(sqlText)
    .then(results => {
      console.log('Sending to do list from server', results);
      res.send(results.rows);
    })
    .catch(error => {
      console.log('Error getting to do list from server', error);
      res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
  console.log('***************************************************************************************************************************************');
  
  let newTask = req.body;
  console.log(newTask);
  
  let sqlText = `INSERT INTO "list" ("task_name", "description", "time_added", "due_date") 
    VALUES($1, $2, $3, $4);`;
  pool.query(sqlText, [newTask.task_name, newTask.description, newTask.time_added, newTask.due_date])
  .then(result => {
    console.log('Added a new task...', newTask);
    res.sendStatus(201);
  })
  .catch(error => {
    console.log('Error adding new task', error);
    res.sendStatus(500);    
  })
})


module.exports = router;