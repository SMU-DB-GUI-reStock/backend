const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

//mysql connection
var connection = mysql.createConnection({
  host: 'backend-db',
  port: '3306',
  user: 'manager',
  password: 'Password',
  database: 'db'
});

//set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
    logger.error("Cannot connect to DB!");
  logger.info("Connected to the DB!");
});

//GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});

//GET /products
//GET /product_types
//GET /departments
//GET /orders
//GET /saless
//GET /users
//GET /products/{id}
//GET /product_types/{id}
//GET /departments/{id}
//GET /orders/{id}
//GET /saless/{id}
//GET /users/{id}
 
//POST /products
app.post('/products', (req, res) => {
  var type_id = req.body.product_type_id;
  var dept_id = req.body.dept_id;
  var order_id = req.body.order_id;
  var exp_date = req.body.exp_date;
  var location = req.body.location;

  var ids = `${type_id}, ${dept_id}, ${order_id}`;
  var values_string = 'product_type_id, dept_id, order_id, exp_date, location';

  connection.query(`INSERT INTO db.products (${values_string}) VALUES(${ids}, '${req.body.exp_date}', '${req.body.location}' )`, function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into products table");
      throw err;
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

//POST /product_types
app.post('/product_types', (req, res) => {
  console.log(req.body);

  connection.query(`INSERT INTO db.product_types (dept_id, product_type_name, price) VALUES(${req.body.dept_id}, '${req.body.product_type_name}', ${req.body.price})`, function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into product_types table");
      throw err;
    }
    else {
      res.status(200).send(`added ${req.body.product_type_name} to the table!`);
    }
  });
});

//POST /departments
app.post('/departments', (req, res) => {
  console.log(req.body);

  connection.query(`INSERT INTO db.departments (dept_name, dept_mngr) VALUES('${req.body.dept_name}',${req.body.dept_mngr})`, function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into departments table");
      throw err;
    }
    else {
      res.status(200).send(`added ${req.body.dept_name} to the table!`);
    }
  });
});

//POST /orders
app.post('/orders', (req, res) => {
  console.log(req.body);

  connection.query(`INSERT INTO db.orders (order_date) VALUES('${req.body.order_date}')`, function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into orders table");
      throw err;
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

//POST /saless
app.post('/sales', (req, res) => {
  console.log(req.body);

  connection.query(`INSERT INTO db.sales (sale_date) VALUES('${req.body.sale_date}')`, function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into sales table");
      throw err;
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

//POST /users
app.post('/users', (req, res) => {
  var type = req.body.type;
  var email = req.body.email;
  var password = req.body.password;
  var firstname = req.body.first;
  var lastname = req.body.last;

  var infos = [type,email,password,firstname,lastname];
  var values = infos.join("','");
  
  connection.query(`INSERT INTO db.users (type, email, password, first, last) VALUES('${values}' )`, function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into users table");
      throw err;
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});


//PUT /products/{id}
//PUT /product_types/{id}
//PUT /departments/{id}
//PUT /orders/{id}
//PUT /saless/{id}
//PUT /users/{id}

//DELETE /products/{id}
//DELETE /product_types/{id}
//DELETE /departments/{id}
//DELETE /orders/{id}
//DELETE /saless/{id}
//DELETE /users/{id}

//POST /reset
app.post('/reset', (req, res) => {
  connection.query('drop table if exists test_table', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
  });
  connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table test_table");
  });
  res.status(200).send('created the table');
});

//POST /multplynumber
app.post('/multplynumber', (req, res) => {
  console.log(req.body.product);

  connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added ${req.body.product} to the table!`);
    }
  });
});

//GET /checkdb
app.get('/values', (req, res) => {
  connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
