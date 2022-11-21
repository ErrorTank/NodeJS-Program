class GroupService {
    constructor(groupModel, userGroupModel) {
        this.groupModel = groupModel;
        this.userGroupModel = userGroupModel;
    }
    async getById(groupId) {
        const group = await this.groupModel.findByPk(groupId);
        if(!group) {
            throw new Error('Group not found with ID: ' + groupId)
        }
        return group;
    }
    getAll() {
        return this.groupModel.findAll();
    }
    create({name, permissions}) {
        return this.groupModel.create({
            name,
            permissions
        });
    }
    async addUsersToGroup(groupId, userIds) {
        const t = await sequelize.transaction();
        let result;
        try {
            result = await userGroupModel.bulkCreate(userIds.map(userId => ({
                userId,
                groupId
            })), {transaction: t})
            await t.commit();
        } catch(err) {
            await t.rollback();
        }
        return result;
    }
    async updateOne(groupId, {name, permissions}) {
        const result = await this.groupModel.update({
            permissions,
            name
        }, {
            where: {id: groupId},
            returning: true,
        });
        if(result[0] === 0) {
            throw new Error('Group ID not existed: ' + groupId)
        }

        return result[1][0].dataValues;
    }
    async deleteOne(groupId) {
        const result = await this.groupModel.destroy({where: {id: groupId}});
        if(result === 0) {
            throw new Error('Group ID not existed: ' + groupId)
        }
    }
    createMany(groups) {
        return this.groupModel.bulkCreate(groups.map(({name, permissions}) => ({
            name,
            permissions
        })));
    }
    deleteAll() {
        return this.groupModel.sync({force: true})
    }
}

export default GroupService;