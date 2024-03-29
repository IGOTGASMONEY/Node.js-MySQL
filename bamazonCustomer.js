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
      // selecting all from the products table where item_id = user ans
      connection.query("SELECT * FROM products WHERE ?", { item_id: answer.productid }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
          }
          buyitem();
        });
      });
  }

  function buyitem() {
    inquirer
    .prompt({
      name: "buying", 
      type:"input",
      message: "How many units would you like to buy of this item?"
    })
    .then(function(answer) {
      connection.query("SELECT stockquantity FROM products WHERE ?", {stock_quantity: answer.buying}, function(err,res) {
        if(answer  <= res.stock_quantity){
          console.log("Take it ALL !");
        
        }else{
          console.log("INSUFFIENT QUANTITY!")
        }
      })
    })
  }