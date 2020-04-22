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
//POST /product_types
//POST /departments
//POST /orders
//POST /sales
//POST /users

//PUT /products/{id}
app.put('/products/:product_id', (req, res) => {
  connection.query('UPDATE db.products SET db.products.product_type_id = '+ req.params.product_type_id +',db.products.product_type = '+ req.params.product_type +',db.products.dept_id = '+ req.params.dept_id +',db.products.order_id = '+ req.params.order_id +',db.products.sale_id = '+ req.params.sale_id +',db.products.exp_date = '+ req.params.exp_date +',db.products.location = '+ req.params.location +'  WHERE db.products.product_id = \'' + req.params.product_id + '\'', function (err, rows, fields) {
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
  connection.query('UPDATE db.product_types SET db.product_type.dept_id = '+ req.params.dept_id +',db.product_type.price = '+ req.params.price +',db.product_type.product_type_name = '+ req.params.product_type_name +' WHERE db.product_type.product_type_id = \'' + req.params.product_type_id + '\'', function (err, rows, fields) {
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
  connection.query('UPDATE db.departments SET db.departments.dept_name = '+ req.params.dept_name +', db.departments.dept_mngr = '+ req.params.dept_mngr +' WHERE db.departments.dept_id = \'' + req.params.dept_id + '\'', function (err, rows, fields) {
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
  connection.query('UPDATE db.orders SET db.orders.order_date = '+ req.params.order_date +'WHERE db.orders.dept_id = \'' + req.params.order_id + '\'', function (err, rows, fields) {
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
  connection.query('UPDATE db.sales SET db.sales.sale_date = '+ req.params.sale_date +'WHERE db.sales.sale_id = \'' + req.params.sale_id + '\'', function (err, rows, fields) {
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
  connection.query('UPDATE db.users SET db.users.type = '+ req.params.type +',db.users.dept_id = '+ req.params.dept_id +',db.users.email = '+ req.params.email +',db.users.password = '+ req.params.password +',db.users.first = '+ req.params.first +',db.users.last = '+ req.params.last +' WHERE db.users.user_id = \'' + req.params.user_id + '\'', function (err, rows, fields) {
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

//TEMPLATE APIS - DO NOT USE - DELETE WHEN USABLE APIS ARE WRITTEN

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
