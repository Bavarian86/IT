### NavyBlue

## Installation Guide:

1 - Make sure to install NodeJs if not yet installed. https://nodejs.org/en/download/
    ! - Make sure to unclick "Automatically install necessary files".
2 -  Open a Terminal and change the directory to the repository folder 
3 - Once the teminal has opened the main repository folder use the following command: "npm install"
4 - When fulfilled enter the following command to run the backend starting point: "node bin\www"
5 - Now the project is running on LocalHost:3000 which you can open in your browser. 
6 -  To end the process please press ctr + c in the Terminal.


## Feature List:

- Login / Logout / Register User
- Catalogue with the items of the shop
- Shopping Cart
- Price priceCalculator based on Palets used and Distance to transport
- Distance Calculator
- User Account order history
- Session Log

## Code Structure

- bin/www - backend starting point. Run ```node www``` to start express js server and ```http://localhost:3000/``` to open application on the browser
- db/* - Generated with MySQL. Scripts for the table creation queries and data manipulation can be found under: MySQL
- public/* - web-client JS scripts and CSS stylesheets
- routes/* - definition of ExpressJS routes. For more details see https://expressjs.com/en/guide/routing.html
- test/* - tests for the functionality of the calculation are defined unter util\pricecalculator starting at line 48.
- views/* - pug templates to generate HTML pages. For more  details see https://pugjs.org/language/attributes.html
- app.js - application entry point, express server configured here
- logs/* - contains the autogenerated Session Logs. 

- Each student is responsible for a whole file and is mentioned at the beginning and the end of the file.





