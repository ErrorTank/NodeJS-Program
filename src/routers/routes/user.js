import { Router } from 'express';
import { userService } from '../../services';
import asyncErrorHandler from '../middlewares/async-error-handler';
const route = Router();

export default (app) => {
    app.use('/users', route);

    route.get('', asyncErrorHandler(async (req, res) => {
        const users = await userService.getAll();
        return res.json({ users }).status(200);
    }));
    route.get('/user/:userId', asyncErrorHandler(async (req, res) => {
        const user = await userService.getById(req.params.userId);

        return res.json({ user }).status(200);
    }));
    route.post('/user', asyncErrorHandler(async (req, res) => {
        const { userName, email } = req.body;
        const user = await userService.create({ userName, email })
        return res.json({ user }).status(200);
    }));
    route.put('/user/:userId', asyncErrorHandler(async (req, res) => {
        const { userName, email } = req.body;
        const user = await userService.updateOne(req.params.userId, { userName, email })
        return res.json({ user }).status(200);
    }));
    route.delete('/user/:userId', asyncErrorHandler(async (req, res) => {
        await userService.deleteOne(req.params.userId)
        return res.json({ userId: req.params.userId }).status(200);
    }));
};