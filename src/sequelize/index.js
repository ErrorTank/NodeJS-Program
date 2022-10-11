import { Sequelize } from "sequelize";
import UserModel from "../models/user";

const sequelize = new Sequelize(process.env.DB_URI);

const models = [
    UserModel,
];

for (const model of models) {
    model(sequelize);
}

export default sequelize;