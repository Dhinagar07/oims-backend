module.exports = (sequelize, DataTypes) => {
  const billitem = sequelize.define('billitem', {
    bill_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bill_id: {
    type: DataTypes.STRING,
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
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  
});
billitem.belongsTo(sequelize.models.Product, {
  foreignKey: 'product_id',
   // Optional alias for the association
});
return  billitem;
};
