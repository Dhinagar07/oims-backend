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
    const u=db.billitem.update(obj,{
      where:{bill_item_id:billItem_id}
    })
    return u 
  } 

  static async deleteBillItem(billItem_id) {
    
        const deletedRows = await db.billitem.destroy({
            where: { bill_item_id:billItem_id }
        });
        return deletedRows > 0;
    
}
static async getBillById(bill_id) {
  try {
    const bill = await db.billitem.findAll({
      where: { bill_id },
      include: {
        model: db.Product, // Assuming you have a 'product' model
        attributes: ['Product_id', 'name','unit','discount'], // Specify the attributes you want to include
      },
    });

    if (!bill) {
      return null; // Bill not found
    }

    return bill;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching bill by ID');
  }
}

  static async  getRecordsForToday() {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Set time to midnight

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); // Set time to end of day

        const records = await db.bill.findAll({
            where: {
                createdAt: {
                    [db.Sequelize.Op.between]: [todayStart, todayEnd],
                },
            },
        });

        return records;
    } catch (error) {
        console.error('Error fetching records:', error);
        throw new Error('Error fetching bill  ID');
    }
}



}

module.exports = bill;
