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
app.get('/products', (req, res) => {
  connection.query('SELECT * FROM db.products', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /product_types
app.get('/product_types', (req, res) => {
  connection.query('SELECT * FROM db.product_types', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /departments
app.get('/departments', (req, res) => {
  connection.query('SELECT * FROM db.departments', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /orders
app.get('/orders', (req, res) => {
  connection.query('SELECT * FROM db.orders', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /sales
app.get('/sales', (req, res) => {
  connection.query('SELECT * FROM db.sales', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM db.users', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});



//GET /products/{id}
app.get('/products/:product_id', (req, res) => {
  connection.query('SELECT * FROM db.products WHERE db.products.product_id = \'' + req.params.product_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /product_types/{id}
app.get('/product_types/:product_type_id', (req, res) => {
  connection.query('SELECT * FROM db.product_types WHERE db.product_types.product_type_id = \'' + req.params.product_type_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /departments/{id}
app.get('/departments/:dept_id', (req, res) => {
  connection.query('SELECT * FROM db.departments WHERE db.departments.dept_id = \'' + req.params.dept_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /orders/{id}
app.get('/orders/:order_id', (req, res) => {
  connection.query('SELECT * FROM db.orders WHERE db.orders.order_id = \'' + req.params.order_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /sales/{id}
app.get('/sales/:sale_id', (req, res) => {
  connection.query('SELECT * FROM db.sales WHERE db.sales.sale_id = \'' + req.params.sale_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /users/{id}
app.get('/users/:user_id', (req, res) => {
  connection.query('SELECT * FROM db.users WHERE db.users.user_id = \'' + req.params.user_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});


 
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

//POST /sales
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
app.put('/products/:product_id', (req, res) => {
  connection.query('UPDATE db.products SET db.products.product_type_id = ' + req.params.product_type_id + ',db.products.order_id = ' + req.params.order_id + ',db.products.sale_id = ' + req.params.sale_id + ',db.products.exp_date = ' + req.params.exp_date + ',db.products.location = ' + req.params.location + '  WHERE db.products.product_id = \'' + req.params.product_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//PUT /product_types/{id}
app.put('/product_types/:product_type_id', (req, res) => {
  connection.query('UPDATE db.product_types SET db.product_type.dept_id = ' + req.params.dept_id + ',db.product_type.price = ' + req.params.price + ',db.product_type.product_type_name = ' + req.params.product_type_name + ' WHERE db.product_type.product_type_id = \'' + req.params.product_type_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//PUT /departments/{id}
app.put('/departments/:dept_id', (req, res) => {
  connection.query('UPDATE db.departments SET db.departments.dept_name = ' + req.params.dept_name + ', db.departments.dept_mngr = ' + req.params.dept_mngr + ' WHERE db.departments.dept_id = \'' + req.params.dept_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//PUT /orders/{id}
app.put('/orders/:order_id', (req, res) => {
  connection.query('UPDATE db.orders SET db.orders.order_date = ' + req.params.order_date + ' WHERE db.orders.order_id = \'' + req.params.order_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//PUT /sales/{id}
app.put('/sales/:sale_id', (req, res) => {
  connection.query('UPDATE db.sales SET db.sales.sale_date = ' + req.params.sale_date + ' WHERE db.sales.sale_id = \'' + req.params.sale_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//PUT /users/{id}
app.put('/users/:user_id', (req, res) => {
  connection.query('UPDATE db.users SET db.users.type = ' + req.params.type + ',db.users.dept_id = ' + req.params.dept_id + ',db.users.email = ' + req.params.email + ',db.users.password = ' + req.params.password + ',db.users.first = ' + req.params.first + ',db.users.last = ' + req.params.last + ' WHERE db.users.user_id = \'' + req.params.user_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});



//DELETE /products/{id}
app.delete('/products/:product_id', (req, res) => {
  connection.query('DELETE FROM db.products WHERE db.products.product_id = \'' + req.params.product_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//DELETE /product_types/{id}
app.delete('/product_types/:product_type_id', (req, res) => {
  connection.query('DELETE FROM db.product_types WHERE db.product_types.product_type_id = \'' + req.params.product_type_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//DELETE /departments/{id}
app.delete('/departments/:dept_id', (req, res) => {
  connection.query('DELETE FROM db.departments WHERE db.departments.dept_id = \'' + req.params.dept_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//DELETE /orders/{id}
app.delete('/orders/:order_id', (req, res) => {
  connection.query('DELETE FROM db.orders WHERE db.orders.order_id = \'' + req.params.order_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//DELETE /sales/{id}
app.delete('/sales/:sale_id', (req, res) => {
  connection.query('DELETE FROM db.sales WHERE db.sales.sale_id = \'' + req.params.sale_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//DELETE /users/{id}
app.delete('/users/:user_id', (req, res) => {
  connection.query('DELETE FROM db.users WHERE db.users.user_id = \'' + req.params.user_id + '\'', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else {
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
