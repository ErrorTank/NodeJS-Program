import {userService} from "../services";
import loadSequelize from '../loaders/sequelize'
import Logger from "../logger";

const users = [
    {
        userName: 'User 1',
        email: 'user1@mail.test'
    },
    {
        userName: 'User 2',
        email: 'user2@mail.test'
    },
    {
        userName: 'User 3',
        email: 'user3@mail.test'
    }
]

const seed = async () => {
    await userService.deleteAll();
    await userService.createMany(users);
}

(async () => {
    try {
        await loadSequelize();
        await seed();
        Logger.info('Seed successfully!');
    } catch(error) {
        Logger.error(error);
        process.exit(1);
    }
})()