const dbConfig = require("./config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; 
db.Admin = require("./admin")(sequelize, Sequelize);

db.bill = require("./bill")(sequelize, Sequelize);
db.Product = require("./product")(sequelize, Sequelize);
db.billitem = require("./billitem")(sequelize, Sequelize);



db.sequelize.sync({ force :false, alter:true }).then(() => {
  console.log("database connected ");
});

module.exports = db;
