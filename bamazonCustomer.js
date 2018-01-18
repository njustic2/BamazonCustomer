var mysql = require("mysql");	//Connects to the mysql node packet
var inquirer = require("inquirer");	//Connects to the inquirer node packet
var connection = mysql.createConnection({	//Establishes a connection to the bamazonDB
  
  host: "localhost",	//Uses the local server
  port: 3306,
  user: "root",
  password: "competitor",
  database: "bamazon"
});

connection.connect(function(err) {	//Checks if there is an error with the mysql connection
  
  if (err) throw err;	//Displays an error if there is one
  showDataBase();	//Calls the showDataBase function
});

function showDataBase() { //Distplays the items for sale.
	
	var query = "SELECT item_id,product_name,department_name,price,stock_quantity FROM products";	//creates a variable for pulling the data from the products database
	connection.query(query, function(err, data) {	//Connects to the database and pulls the data
    	    
        for (var i = 0; i < data.length; i++) {	//Parses the database into an array
            
            console.log("---------------------#" + data[i].item_id + "---------------------");	//Displays the item number
			console.log("Product Name: " + data[i].product_name + "\n" + "Catagory: " + data[i].department_name + "\n" + "Price: $" + data[i].price + "\n" + "Amount Available: " + data[i].stock_quantity);	//Displays the item name, department name, price and stock quantity
		};

		userPrompt();	//Calls the userPrompt function
		
		if (err) throw err;
      	
    });  
};

function userPrompt() { //asks the customer for an id number for the desired item and a quantity to purchase.
	
	inquirer	//Calls on the inquirer node packet
	    .prompt([	//Prompts the user and askes for a response
	      	
	      	{
	        	name: "itemChoice",
	        	type: "input",
	        	message: "Enter the number of the product that you would like to purchase. ",
	        	validate: function(value) {	//Makes a function that verifies that the user input is a number
	         	
	         	if (isNaN(value) === false) {	//If the user input is not a number then responds
	            	return true;
	         	}
	          	
	          	return false; 
	        	}
	      	},

	      	{
	        	name: "itemQuantity",
	        	type: "input",
	        	message: "How many of these would you like to purchase? ",
	        	validate: function(value) {
	          	
	          		if (isNaN(value) === false) {
	            		return true;
	          		}
	        	
	        		return false;
	      		  	}
	      	}
	    ])

	    .then(function(answer) {	//Pushes the user inputs into variables

	    	itemNumber = answer.itemChoice;
	      	customerAmount = answer.itemQuantity;

			checkQuantity(itemNumber, customerAmount);	//Invokes the checkQuantity using the user input variables
		});
};

function checkQuantity(itemNumber, customerAmount) {	//Checkes if there are enough of the item requested in stock to fulfill the customer order. Alerts the user if there is insufficient quantities.
  	
  	connection.query("SELECT * FROM products WHERE item_id=? ",[itemNumber], function(err, res) {	//Creates a connection to the database and compares the itemNumber varaible to the number in the database
   	 	
   	 	if (err) throw err;
    	
    	if (customerAmount <= res[0].stock_quantity) {	//If the requested amount is less then the database says is available
      		
      		var amountDue = customerAmount * res[0].price;	//Creates a varaible that multiplys the number of the product purchassed by the unit price
      		var remainingAmount = res[0].stock_quantity - customerAmount;	//Creates a variable that is the result from deducting the requested amount from the total amount
      		itemNumber = itemNumber;	//Passes the requested item number along
      		
      		fulfillOrder(amountDue, remainingAmount, itemNumber);	//Invokes the fulfillOrder function and passes in the variables

    	} else {
    		
    		console.log("There are insufficient numbers of this item available to fulfull this request");	//Tells the user that the availability is not enough
    		setTimeout(()=>{showDataBase()}, 6000);	//Invokes the showDataBase after 6 seconds
    	};
    });
};

function fulfillOrder(amountDue, remainingAmount, itemNumber) { //Updates the database to reflect the removal of the customer order and gives a total cost for the order.

	console.log("Transaction complete. Amount owed: $" + amountDue);	//Shows the user that the transaction completed with the total cost

      	connection.query("UPDATE products SET stock_quantity= ? WHERE item_id=?", [remainingAmount, itemNumber], function(err, res) {	//Updates the database with the new quantity
        	
        	if (err) throw err;
      	});

    setTimeout(()=>{showDataBase()}, 6000);
};