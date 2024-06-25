const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const adminLogin = require("./routes/login_route")
const Product = require("./routes/product_route")
const bill = require("./routes/bill_route")


const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); 

app.use("/auth",adminLogin);

app.use("/product",Product);
app.use("/bill",bill);

app.listen(port,'0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});

