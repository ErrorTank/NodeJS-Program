import {Router} from 'express';
import {groupService} from '../../services';
import asyncErrorHandler from '../middlewares/async-error-handler';
const route = Router();

export default (app) => {
    app.use('/groups', route);

    route.get('', asyncErrorHandler(async (req, res) => {
        const groups = await groupService.getAll();
        return res.json({groups}).status(200);
    }));
    route.get('/group/:groupId', asyncErrorHandler(async (req, res) => {
        const group = await groupService.getById(req.params.groupId);

        return res.json({group}).status(200);
    }));
    route.post('/group', asyncErrorHandler(async (req, res) => {
        const {name, permissions} = req.body;
        const group = await groupService.create({name, permissions})
        return res.json({group}).status(200);
    }));
    route.post('/group/:groupId/add-users', asyncErrorHandler(async (req, res) => {
        const {userIds} = req.body;
        const userGroups = await groupService.addUsersToGroup(req.params.groupId, userIds)
        return res.json({userGroups}).status(200);
    }));
    route.put('/group/:groupId', asyncErrorHandler(async (req, res) => {
        const {name, permissions} = req.body;
        const group = await groupService.updateOne(req.params.groupId, {name, permissions})
        return res.json({group}).status(200);
    }));
    route.delete('/group/:groupId', asyncErrorHandler(async (req, res) => {
        await groupService.deleteOne(req.params.groupId)
        return res.json({groupId: req.params.groupId}).status(200);
    }));
};
