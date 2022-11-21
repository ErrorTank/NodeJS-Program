import {DataTypes, UUIDV4} from "sequelize";
import GROUP_PERMISSION from "../constant/group-permission";

const GroupModel = (sequelize) => {
    return sequelize.define('group', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        permissions: {
            allowNull: false,
            type: DataTypes.ARRAY(DataTypes.ENUM({
                values: Object.values(GROUP_PERMISSION)
            })),
        }
    });
};

export default GroupModel;