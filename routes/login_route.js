const express = require('express');
const router = express.Router();
const db= require('../models/db');
const admin=require('../controller/admin');
const ct = require( '../utils/createToken');

router.use(express.json());


router.post('/admin-login', async (req, res) => {
  
        try {
                result=await admin.login(db,req.body);
                console.log('resuuult',result);         
                if (result) {
                    token = ct(req,res)
                    res.status(200).json({ "message": "Successfully loggedin","token":token });
               } else {
                res.status(403).json({ "error": "Failed to login" });
               }
           } 
           catch (error) {
               console.error('server Error', error);
               res.status(500).json({ "error": "Internal server error" });
           }

});
module.exports = router
