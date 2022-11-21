import UserService from "../user";
import mockUserModel, {mockCreate, mockDestroy, mockFindAll, mockFindByPk, mockUpdate} from "./__mocks__/user-model.mock";

const userService = new UserService(mockUserModel);

describe('User Services', () => {
    describe('getById', () => {
        beforeEach(() => {
            mockFindByPk.mockClear();
        });
        it('Should return user', async () => {
            const mockUser = {
                id: '1'
            }
            mockFindByPk.mockReturnValueOnce(mockUser);
            const user = await userService.getById(mockUser.id);
            expect(mockFindByPk).toHaveBeenCalledTimes(1);
            expect(mockFindByPk).toHaveBeenCalledWith(mockUser.id);
            expect(user).toBe(mockUser);
        });
        it('Should throw error if no user have found', async () => {
            mockFindByPk.mockReturnValueOnce(null);
            const userId = '123';
            await expect(userService.getById(userId))
                .rejects
                .toThrow(`User not found with ID: ${userId}`);
        })
    })
    describe('getAll', () => {
        beforeEach(() => {
            mockFindAll.mockClear();
        });
        it('Should return all users', async () => {
            mockFindAll.mockReturnValueOnce([{id: '2'}]);
            const users = await userService.getAll();
            expect(mockFindAll).toHaveBeenCalledTimes(1);
            expect(users).toMatchSnapshot();
        });
    })
    describe('create', () => {
        beforeEach(() => {
            mockCreate.mockClear();
        });
        it('Should create new user', async () => {
            const input = {
                userName: 'test',
                email: 'test@mail.cc'
            }
            mockCreate.mockReturnValueOnce(input);
            const user = await userService.create(input);
            expect(mockCreate).toHaveBeenCalledTimes(1);
            expect(mockCreate).toHaveBeenCalledWith({
                username: input.userName,
                email: input.email
            });
            expect(user).toBe(input);
        });
    })
    describe('update', () => {
        beforeEach(() => {
            mockUpdate.mockClear();
        });
        it('Should update user', async () => {
            const userId = 'xyz';
            const input = {
                userName: 'test',
                email: 'test@mail.cc'
            }
            mockUpdate.mockReturnValueOnce([
                1,
                [{
                    dataValues: input
                }]
            ]);
            const user = await userService.updateOne(userId, input);
            expect(mockUpdate).toHaveBeenCalledTimes(1);
            expect(mockUpdate).toHaveBeenCalledWith({
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
            mockUpdate.mockReturnValueOnce([
                0,
            ]);
            await expect(userService.updateOne(userId, input))
                .rejects
                .toThrow(`User ID not existed: ${userId}`);
        });
    })
    describe('deleteOne', () => {
        beforeEach(() => {
            mockDestroy.mockClear();
        });
        it('Should delete user', async () => {
            const userId = 'x';
            mockDestroy.mockReturnValueOnce(1);
            await expect(async () => userService.deleteOne(userId))
                .not
                .toThrow(`User ID not existed: ${userId}`);
            expect(mockDestroy).toHaveBeenCalledTimes(1);
            expect(mockDestroy).toHaveBeenCalledWith({where: {id: userId}});
        });
        it('Should throw error if no user have found', async () => {
            const userId = 'x';
            mockDestroy.mockReturnValueOnce(0);
            await expect(async () => userService.deleteOne(userId))
                .rejects
                .toThrow(`User ID not existed: ${userId}`);
        });
    })
})