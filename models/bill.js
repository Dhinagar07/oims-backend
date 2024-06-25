
module.exports = (sequelize, DataTypes) => {

const bill = sequelize.define('bill', {
  bill_id: {
    type: DataTypes.STRING,
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
