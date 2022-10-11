import sequelize from "../sequelize";
import UserService from "./user";

const userService = new UserService(sequelize.models.user)

export {
    userService
}