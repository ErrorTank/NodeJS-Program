const mockFindByPk = jest.fn();
const mockFindAll = jest.fn();
const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDestroy = jest.fn();
const mockBulkCreate = jest.fn();
const mockSync = jest.fn();

const mockUserModel = {
    findByPk: mockFindByPk,
    findAll: mockFindAll,
    create: mockCreate,
    update: mockUpdate,
    destroy: mockDestroy,
    bulkCreate: mockBulkCreate,
    sync: mockSync
}

export default mockUserModel;

export {
    mockFindAll,
    mockFindByPk,
    mockCreate,
    mockUpdate,
    mockDestroy,
    mockBulkCreate,
    mockSync
}