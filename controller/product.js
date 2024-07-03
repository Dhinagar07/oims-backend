const { QueryTypes, where } = require('sequelize');

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
            const product = await db.Product.create(obj);
              
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
            const product =db.Product.update({obj,
              where:{product_id:obj.product_id}
            });
            if(product.length !=0){
                return true;
            }
            else{
                return false;
            }
                    
    }


}
module.exports=product;