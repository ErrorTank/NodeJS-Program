import {Router} from 'express';
import exposeApiDetails from './middlewares/task-5-1';
import user from './routes/user';
import group from './routes/group';
const app = Router();

export default () => {
    app.use(exposeApiDetails);
    user(app);
    group(app);
    return app
}