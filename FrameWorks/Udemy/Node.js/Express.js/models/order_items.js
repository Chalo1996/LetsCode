import sequelize from "../util/database.js";
import { DataTypes } from "sequelize";

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  quantity: DataTypes.INTEGER,
});

export default OrderItem;
