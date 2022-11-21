import {Sequelize} from "sequelize";
import UserModel from "../models/user";
import GroupModel from "../models/group";
import UserGroupModel from "../models/group-user";

const sequelize = new Sequelize(process.env.DB_URI);

const User = UserModel(sequelize);
const Group = GroupModel(sequelize);
const UserGroup = UserGroupModel(sequelize, User, Group);

User.belongsToMany(Group, {through: UserGroup});
Group.belongsToMany(User, {through: UserGroup});

export default sequelize;