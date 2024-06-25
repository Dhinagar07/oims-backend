const express = require('express');
const router = express.Router();
const bill = require('../controller/bill')
const db= require('../models/db');
const customer=require('../controller/customer');
const authenticatejwt = require('../utils/authenticateJWT') 


router.use(express.json());


router.post('/createBill',authenticatejwt, async (req, res) => {
    
  try {
     result= await bill.createBillItem(req.body);    
    if (result) {
        res.status(200).json({ "message": "Success","id":result });
    } else {
        res.status(403).json({ "error": "Id exist already" });
    }
} 
catch (error) {
    console.error( error);
    res.status(500).json({ "error": "Internal server error" });
}

});

router.post('/updateBill',authenticatejwt, async (req, res) => {
    
    try {
       result= await bill.updatebill(req.body);    
      if (result) {
          res.status(200).json({ "message": "Success" });
      } 
  }
  catch (error) {
      console.error( error);
      res.status(500).json({ "error": "Internal server error" });
  }
  
  });
  

module.exports = router
