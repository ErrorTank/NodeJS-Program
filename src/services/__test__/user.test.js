import UserService from "../user";
import mockUserModel from "./__mocks__/user-model.mock";

const userService = new UserService(mockUserModel);
describe('User Services', () => {
    describe('getById', () => {
        beforeEach(() => {
            mockUserModel.findByPk.mockClear();
        });
        it('Should return user', async () => {
            const mockUser = {
                id: '1'
            }
            mockUserModel.findByPk.mockReturnValueOnce(mockUser);
            const user = await userService.getById(mockUser.id);
            expect(mockUserModel.findByPk).toHaveBeenCalledTimes(1);
            expect(mockUserModel.findByPk).toHaveBeenCalledWith(mockUser.id);
            expect(user).toBe(mockUser);
        });
        it('Should throw error if no user have found', async () => {
            mockUserModel.findByPk.mockReturnValueOnce(null);
            const userId = '123';
            await expect(userService.getById(userId))
                .rejects
                .toThrow(`User not found with ID: ${userId}`);
        })
    })
    describe('getAll', () => {
        beforeEach(() => {
            mockUserModel.findAll.mockClear();
        });
        it('Should return all users', async () => {
            mockUserModel.findAll.mockReturnValueOnce([{id: '2'}]);
            const users = await userService.getAll();
            expect(mockUserModel.findAll).toHaveBeenCalledTimes(1);
            expect(users).toMatchSnapshot();
        });
    })
    describe('create', () => {
        beforeEach(() => {
            mockUserModel.create.mockClear();
        });
        it('Should create new user', async () => {
            const input = {
                userName: 'test',
                email: 'test@mail.cc'
            }
            mockUserModel.create.mockReturnValueOnce(input);
            const user = await userService.create(input);
            expect(mockUserModel.create).toHaveBeenCalledTimes(1);
            expect(mockUserModel.create).toHaveBeenCalledWith({
                username: input.userName,
                email: input.email
            });
            expect(user).toBe(input);
        });
    })
    describe('update', () => {
        beforeEach(() => {
            mockUserModel.update.mockClear();
        });
        it('Should update user', async () => {
            const userId = 'xyz';
            const input = {
                userName: 'test',
                email: 'test@mail.cc'
            }
            mockUserModel.update.mockReturnValueOnce([
                1,
                [{
                    dataValues: input
                }]
            ]);
            const user = await userService.updateOne(userId, input);
            expect(mockUserModel.update).toHaveBeenCalledTimes(1);
            expect(mockUserModel.update).toHaveBeenCalledWith({
                username: input.userName,
                email: input.email
            }, {
                where: {id: userId},
                returning: true,
            });
            expect(user).toBe(input);
        });
        it('Should throw error if no user have found', async () => {
            const userId = 'xyz';
            const input = {
                userName: 'test',
                email: 'test@mail.cc'
            }
            mockUserModel.update.mockReturnValueOnce([
                0,
            ]);
            await expect(userService.updateOne(userId, input))
                .rejects
                .toThrow(`User ID not existed: ${userId}`);
        });
    });
    describe('deleteOne', () => {
        beforeEach(() => {
            mockUserModel.destroy.mockClear();
        });
        it('Should delete user', async () => {
            const userId = 'x';
            mockUserModel.destroy.mockReturnValueOnce(1);
            await expect(async () => userService.deleteOne(userId))
                .not
                .toThrow(`User ID not existed: ${userId}`);
            expect(mockUserModel.destroy).toHaveBeenCalledTimes(1);
            expect(mockUserModel.destroy).toHaveBeenCalledWith({where: {id: userId}});
        });
        it('Should throw error if no user have found', async () => {
            const userId = 'x';
            mockUserModel.destroy.mockReturnValueOnce(0);
            await expect(async () => userService.deleteOne(userId))
                .rejects
                .toThrow(`User ID not existed: ${userId}`);
        });
    })
})