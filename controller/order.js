const { QueryTypes } = require('sequelize');

class Order
{
    static async createOrder(db,obj) {
                
        
            console.log(obj); 
            const order = await db.Order.sequelize.query(
                'INSERT INTO Orders (customer_id, createdAt, updatedAt) VALUES (:customer_id,NOW(),NOW())',
                {
                  replacements: {
                    customer_id: obj.customer_id,
                    

                  },
                  type: QueryTypes.INSERT
                }
              );

              const orderIdQuery = await db.Order.sequelize.query('SELECT LAST_INSERT_ID() AS orderId', {
                type: QueryTypes.SELECT,
              });
            const orderId=orderIdQuery[0].orderId;  
            console.log(orderIdQuery[0].orderId);
          const itemInsertPromises = obj.items.map(async (item) => {
            await db.OrderItem.sequelize.query(
              'INSERT INTO Orderitems (order_id,product_id, quantity,createdAt, updatedAt) VALUES (:order_id,:product_id,:quantity,NOW(),NOW())',
              {
                replacements: {
                  order_id:orderId,
                  product_id: item.product_id,
                  quantity: item.quantity
                  

                },
                type: QueryTypes.INSERT
              }
            );
          });
          await Promise.all(itemInsertPromises);

            
            return orderId;
        
    }
    static async updateOrder(db,obj) {
      const ordercheck = await db.Order.sequelize.query(
          'SELECT * FROM orders WHERE order_id = :id',
          {
            replacements: { id: obj.order_id },
            type: QueryTypes.SELECT,
          }
        );
        console.log(ordercheck.length);
      if (ordercheck.length == 0) {
          return false;
      }
          console.log(obj); 
          const order = await db.Order.sequelize.query(
              'UPDATE orders SET Payment_status = :status,updatedAt=NOW() WHERE order_id = :order_id',
              {
                replacements: {
                  status: obj.status,
                  order_id:obj.order_id

                },
                type: QueryTypes.UPDATE
              }
            );
          if(order.length !=0){
              return true;
          }
          else{
              return false;
          }
                  
  }

  static async listOrder(db,customer_id){
    const list = await db.Order.sequelize.query('SELECT * FROM Orders where payment_status="paid" AND customer_id=:id',
    {
      replacements: {
        id: customer_id,     
  
      },
      type: QueryTypes.SELECT
    }
   
    );
    if (list.length == 0) {
      return false;
  ``}
    return list; 
``}     

static async listOrderItem(db,orderid){
  const list = await db.OrderItem.sequelize.query('SELECT * FROM Orderitems where order_id=:id ',
  {
    replacements: {
      id: orderid,     

    },
    type: QueryTypes.SELECT
  }
  );
  if (list.length == 0) {
    return false;
}
  return list; 
``}


static async CartList(db,customer_id){
  const list = await db.Order.sequelize.query('SELECT * FROM Orders where payment_status !="paid" AND customer_id = :id',
  {
    replacements: {
      id: customer_id     

    },
    type: QueryTypes.SELECT
  }
  );
  if (list.length == 0) {
    return false;
``}
  return list; 
``}

}


module.exports=Order;