
module.exports = (sequelize, DataTypes) => {

const bill = sequelize.define('bill', {
  bill_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    
  },
  admin_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "admins",
      key: "id",
    },    
  }, 
  
  
});
return bill; 
};
