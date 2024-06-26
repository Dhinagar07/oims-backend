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
      }  else {
        res.status(404).json({ "error": "Row not found" });
    }
  }
  catch (error) {
      console.error( error);
      res.status(500).json({ "error": "Internal server error" });
  }
  
  });
  router.delete('/deleteBill', authenticatejwt, async (req, res) => {
    try {
        const { billItem_id } = req.body;
        const result = await bill.deleteBillItem(billItem_id);
        if (result) {
            res.status(200).json({ "message": "Row deleted successfully" });
        } else {
            res.status(404).json({ "error": "Row not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Internal server error" });
    }
});

router.get('/getbill/:bill_id', authenticatejwt, async (req, res) => {
  try {
    const { bill_id } = req.params;
    const Bill = await bill.getBillById(bill_id);

    if (!Bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.status(200).json({Bill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/getTodayBill', authenticatejwt, async (req, res) => {
  try {
    
    const Bill = await bill.getRecordsForToday();

    if (!Bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.status(200).json({Bill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



  
module.exports = router
