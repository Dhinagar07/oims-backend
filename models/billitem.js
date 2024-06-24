module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('billitem', {
    bill_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bill_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "bills",
      key: "bill_id",
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "products",
      key: "product_id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
});
return OrderItem; 
};
