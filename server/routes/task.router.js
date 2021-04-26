const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
  let sqlText = `SELECT * FROM "list" ORDER BY "id";`;
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
  
  let newTask = req.body;
  console.log(newTask);
  
  let sqlText = `INSERT INTO "list" ("task_name", "description", "time_added", "due_date") 
  VALUES($1, $2, $3, $4);`;
  pool.query(sqlText, [newTask.task_name, newTask.description, newTask.time_added, newTask.due_date])
  .then(result => {
    console.log('Added a new task...', result);
    res.sendStatus(201);
  })
  .catch(error => {
    console.log('Error adding new task', error);
    res.sendStatus(500);    
  })
});

router.put('/:id', (req, res) => {
  console.log(' PUT*******************************************************************************************************************************');
  console.log(req.body);
  console.log(req.params.id);
  let idToUpdate = req.params.id;
  console.log('idToUpdate');
  const sqlText = `UPDATE "list" SET "completed"='true' WHERE "id"=$1;`;
  pool.query(sqlText, [idToUpdate])
  .then(result => {
    console.log('Data has been updated', result);
    res.sendStatus(201);
  })
  .catch(error => {
    console.log('Error updating data', error);
    res.sendStatus(500);
  })
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let sqlText = `DELETE FROM "list" WHERE "id"=$1;`;
  pool.query(sqlText, [id])
  .then(result => {
    console.log('Deleted task:', result);
    res.sendStatus(201);
  })
  .catch(error => {
    console.log('Unable to delete task', error);
    res.sendStatus(500);
  });
})

module.exports = router;