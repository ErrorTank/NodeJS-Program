import {DataTypes} from "sequelize";

const UserGroupModel = (sequelize, User, Group) => {
    return sequelize.define('usergroup', {
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id'
            }
        },
        groupId: {
            type: DataTypes.UUID,
            references: {
                model: Group,
                key: 'id'
            }
        }
    });
};

export default UserGroupModel;