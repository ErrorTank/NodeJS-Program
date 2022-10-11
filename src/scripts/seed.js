import { userService } from "../services";
import loadSequelize from '../loaders/sequelize'

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
        console.log('Seed successfully!');
    } catch (error) {
        console.error('Seed failed!', error);
        process.exit(1);
    }
})()