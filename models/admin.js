module.exports = (sequelize, DataTypes) => {

const Admin = sequelize.define('Admin', {
    
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
return Admin;
};


