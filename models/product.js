module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    barcode: { // Corrected typo from 'barcose' to 'barcode'
      type: DataTypes.STRING,
      allowNull: true,
    },
    price_per_unit: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  });

  return Product; // Moved the return statement to the correct position
};