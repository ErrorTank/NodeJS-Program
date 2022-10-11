import { DataTypes, UUIDV4 } from "sequelize";

const UserModel = (sequelize) => {
    sequelize.define('user', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        }
    });
};

export default UserModel;