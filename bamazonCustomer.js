var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function (err) {
  if (err) throw err;
  displayItems();
});

function displayItems() {

  connection.query("SELECT item_id, product_name, price, stock_quantity FROM product WHERE stock_quantity>0", function (err, res) {

    if (err) throw err;
    console.log("Id\tName\tPrice\tQuantity\t");

    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id +
        "\t" +
        res[i].product_name +
        "\t" +
        res[i].price +
        "\t" +
        res[i].stock_quantity +
        "\t"
      );
    }
    promptQuestion(res.length);
  }
  );
}


function promptQuestion(length) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "purcase_item_id",
        message:
          "Enter the Item Id you would like to buy? Press C to Exit"
      }
    ])
    .then(function (answer) {
      var purchaseItemId = answer.purcase_item_id;
      if (purchaseItemId.toUpperCase() === "C") {
        process.exit();
      }
      inquirer
        .prompt([
          {
            type: "input",
            name: "quantity",
            message: "how many units of the product would you like to buy???"
          }
        ])
        .then(function (answer) {
          if (
            purchaseItemId > length + 1 ||
            isNaN(purchaseItemId) ||
            isNaN(answer.quantity)
          ) {
            console.log("invalid Input");
            if (purchaseItemId > length + 1 || isNaN(purchaseItemId)) {
              console.log("The item id is not valid");
            }
            if (isNaN(answer.quantity)) {
              console.log("Invalid quantity");
            }
            // connection.end();
            displayItems();
          } else {
            connection.query(
              "SELECT stock_quantity, price FROM product WHERE item_id = ?",
              [purchaseItemId],
              function (err, res) {
                if (err) throw err;
                if (answer.quantity > res[0].stock_quantity) {
                  console.log("Insufficient quantity!");
                } else {
                  var updateQuantity =
                    res[0].stock_quantity - parseFloat(answer.quantity);
                  connection.query(
                    "update product set ? WHERE ?",
                    [
                      {
                        stock_quantity: updateQuantity
                      },
                      {
                        item_id: purchaseItemId
                      }
                    ],
                    function (err, res) {
                      if (err) throw err;
                    }
                  );
                  var totalCost = res[0].price * answer.quantity;
                  console.log(
                    "The total price of the purchase : " + totalCost.toFixed(2)
                  );
                }
                // connection.end();
                displayItems();
              }
            );
          }
        });
    });
}