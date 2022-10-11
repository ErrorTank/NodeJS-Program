class UserService {
    constructor (userModel) {
        this.userModel = userModel;
    }
    async getById(userId) {
        const user = await this.userModel.findByPk(userId);
        if (!user) {
            throw new Error('User not found with ID: ', userId)
        }
        return user;
    }
    getAll() {
        return this.userModel.findAll();
    }
    create({ userName, email }) {
        return this.userModel.create({
            username: userName,
            email
        });
    }
    async updateOne(userId, { userName, email }) {
        const result = await this.userModel.update({
            username: userName,
            email
        }, {
            where: { id: userId },
            returning: true,
        });
        if (result[0] === 0) {
            throw new Error('User ID not existed: ', userId)
        }

        return result[1][0].dataValues;
    }
    async deleteOne(userId) {
        const result = await this.userModel.destroy({ where: { id: userId } });
        if (result === 0) {
            throw new Error('User ID not existed: ', userId)
        }

    }
    createMany(users) {
        return this.userModel.bulkCreate(users.map(({ userName, email }) => ({
            username: userName,
            email
        })));
    }
    deleteAll() {
        return this.userModel.sync({ force: true })
    }
}

export default UserService;