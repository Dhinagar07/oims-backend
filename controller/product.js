const { QueryTypes } = require('sequelize');

class product
{
    static async createProduct(db,obj) {
            
        const productcheck = await db.Product.sequelize.query(
            'SELECT * FROM Products WHERE name = :name',
            {
              replacements: { name: obj.name },
              type: QueryTypes.SELECT,
            }
          );
                  
        if (productcheck.length != 0) {
            return false;
        }

            console.log(obj); 
            const product = await db.Product.sequelize.query(
                'INSERT INTO Products (name, price_per_unit, unit, stock_quantity, createdAt, updatedAt) VALUES (:name,:price_per_unit,:unit,:stock_quantity,NOW(),NOW())',
                {
                  replacements: {
                    name: obj.name,
                    
                    price_per_unit: obj.price_per_unit,
                    unit:obj.unit,
                    stock_quantity:obj.stock_quantity
                    

                  },
                  type: QueryTypes.INSERT
                }
              );
              
            console.log(product); 
            
            console.log(product.length);
            return product;
        
    }
    static async listProduct(db){
        const [list] = await db.Product.sequelize.query('SELECT * FROM Products');
        
        return list;    

    }

    static async deleteProduct(db,id){
        const productcheck = await db.Product.sequelize.query(
            'SELECT * FROM Products WHERE product_id = :id',
            {
              replacements: { id: id },
              type: QueryTypes.SELECT
            }
          );
          console.log(productcheck.length);
        if (productcheck.length == 0) {
            return false;
        }


        const product = await db.Product.sequelize.query(
            'DELETE FROM Products WHERE product_id = :id',
            {
              replacements: { id: id },
              type: QueryTypes.DELETE
            }
          );
            return true;
        
        
        
    }

    static async updateProduct(db,obj) {
        const productcheck = await db.Product.sequelize.query(
            'SELECT * FROM Products WHERE product_id = :id',
            {
              replacements: { id: obj.product_id },
              type: QueryTypes.SELECT,
            }
          );
          console.log(productcheck.length);
        if (productcheck.length == 0) {
            return false;
        }
            console.log(obj); 
            const product = await db.Product.sequelize.query(
                'UPDATE Products SET name = :name, price_per_unit=:price_per_unit, unit=:unit, stock_quantity=:stock_quantity,updatedAt=NOW() WHERE product_id = :product_id',
                {
                  replacements: {
                    name: obj.name,
                    description: obj.description,
                    price_per_unit: obj.price_per_unit,
                    unit:obj.unit,
                    stock_quantity:obj.stock_quantity,
                    product_id:obj.product_id

                  },
                  type: QueryTypes.UPDATE
                }
              );
            if(product.length !=0){
                return true;
            }
            else{
                return false;
            }
                    
    }


}
module.exports=product;