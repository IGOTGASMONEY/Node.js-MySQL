var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "bamazon"

});



connection.connect(function (err) {
    if (err) throw err;

    console.log('Connected as id ${connection.threadId}');
    queryAll();
    start();
});

function queryAll() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;

        console.log("all rows ", data);
        start();
    })
};

function start() {
    inquirer
      .prompt({
        name: "productid",
        type: "input",
        message: "What is the id of the product you would like to buy?"
      })
      .then(function(answer) {
        var query= "SELECT item_id,product_name,price,stock_quantity FROM products WHERE item_it D ?";
        connection.query(query, [ answer.item_id], function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
          }
        //   runSearch();
        });
      });
  }
