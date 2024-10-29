const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');

const app = express();
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

console.log (process.env.DB_USERNAME);

app.get('/',(req,res)=>{
  res.send('Hello World');
});
// Question 1 goes here

app.get('/patients',(req,res)=>{
   const sql = ('SELECT patient_id, first_name, last_name, date_of_birth FROM patients');

   db.query(sql,(err,results) => {
     if (err) {
      return res.status(500).send(err);
     }
     res.json(results);
   });
});


// Question 2 goes here

app.get('/providers',(req,res)=>{
  const sql = ('SELECT first_name, last_name, provider_specialty FROM providers');

  db.query(sql,(err,results) => {
    if (err) {
     return res.status(500).send(err);
    }
    res.json(results);
  });
})

// Question 3 goes here
app.get('/first_name',(req,res)=>{
  const first_name = req.query.first_name;
  console.log({first_name});
  const sql = "SELECT first_name FROM Patients ";
  db.query (sql,[first_name],(req,res)=>{
     if (err){
      return res.status(500).send(err);
     };
     res.json({results:results});
  });
});


// Question 4 goes here
app.get('/providers_specialty', (req, res) => {
  const specialty = req.query.specialty;
  console.log({ specialty });
  
  const sql = "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?";
  db.query(sql, [specialty], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({results:results});
  });
});




// listen to the server
const PORT = 3303
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})