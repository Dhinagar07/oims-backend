const express = require('express');
const router = express.Router();
const db= require('../models/db');
const product=require('../controller/product');
router.use(express.json())
const multer = require('multer');
const authenticatejwt = require("../utils/authenticateJWT")
const path = require('path');

// Set up multer storage and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files in the uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename files with current timestamp
  },
});

const upload = multer({ storage: storage });

router.post('/create-product', upload.single('image'), async (req, res) => {
  
  try {
    console.log(req.file);
    console.log(req.body);
    const imagePath = req.file ? 'uploads/' + req.file.filename : null;
    req.body.image_path = imagePath;   
  
    result= await product.createProduct(db,req.body);
    console.log('res',result);
    if (result) {
        res.status(200).json({ "message": "Successfully inserted" });
    } else {
        res.status(403).json({ "error": "Product exist already" });
    }
} 
catch (error) {
    
    console.error('Error creating product : ', error);
    res.status(500).json({ "error": "Internal server error " });
}

});


// Route to get all products
router.post('/list',authenticatejwt,async (req, res) => {
    try {
       const result= await product.listProduct(db);
       
        
        if (!result) {
            res.status(403).json({ "error": "Product not exist" });
        } else {
            res.status(200).json(result);                   }
        
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({" error": 'Failed to fetch products' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        console.log(req.body);
        req.body.product_id = productId;
        result= await product.updateProduct(db,req.body);
        if(result)
        {
            res.status(200).json({"message": "Successfully updated"});

        }else{
            res.status(403).json({"message": "PRODUCT NOT EXIST"});
        }
    } catch (error) {
        console.error('server Error :', error);
        res.status(500).json({ "error": 'server error' });
    }
});
router.delete('/:id', async (req, res) => {
    try{
    result= await product.deleteProduct(db,parseInt(req.params.id));
    
        if (result) {
            res.json({ message: 'Row deleted successfully' });
        } else {
            res.status(403).json({ "error": "product not exist" });
        }
    } catch (error) {
        console.error('server error:', error);
        res.status(500).json({ "error": 'internal server error' });
    }
  });




module.exports = router
