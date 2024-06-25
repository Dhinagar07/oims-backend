const admin = require('../models/admin');
const db = require('../models/db');

class bill {
  static async createBillItem(obj) {
    const { bill_id, product_id, quantity,price } = obj;

    let billIdToUse = bill_id;

    // Check if bill_id is "0000", then create a new bill
    if (bill_id === "0000") {
      billIdToUse =String(Date.now())
      const newBill = await db.bill.create({
        bill_id: billIdToUse,
        admin_id:1
      });

      
    }

    // Create bill item using billIdToUse
    const newBillItem = await db.billitem.create({
      bill_id: billIdToUse,
      product_id,
      quantity,
      price
    });

    return billIdToUse;
  }
  static async updatebill(obj){
    const { billItem_id, product_id, quantity,price} = obj;
    db.billitem.update(obj,{
      where:{billItem_id:bill}
    })
    return true
  } 
}

module.exports = bill;
