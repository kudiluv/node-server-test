import {Sequelize, DataTypes, Model} from "sequelize";

interface TestAttributes {
  id: number;
  name: string;
  userId: number;
}
export interface TestInctance extends Model<TestAttributes>, TestAttributes{}

module.exports = (sequelize: Sequelize) => {
    const Test = sequelize.define<TestInctance>('Test',{
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        }
    });
    return Test;
}