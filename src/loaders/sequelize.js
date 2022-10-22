import Logger from "../logger";
import sequelize from "../sequelize";

const loadSequelize = async () => {
    Logger.info(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        Logger.info('Database connection OK!');
    } catch(error) {
        Logger.info('Unable to connect to the database:');
        Logger.error(error);
        process.exit(1);
    }
}

export default loadSequelize;