import sequelize from "../sequelize";
import GroupService from "./group";
import UserService from "./user";

const userService = new UserService(sequelize.models.user)
const groupService = new GroupService(sequelize.models.group, sequelize.model.usergroup)

export {
    userService,
    groupService
}