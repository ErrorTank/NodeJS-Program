import loadExpress from "./express";
import loadSequelize from "./sequelize";

export default async ({ app }) => {
    await loadSequelize();
    await loadExpress({ app });
}