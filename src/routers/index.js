import { Router } from 'express';
import user from './routes/user';
const app = Router();

export default () => {
    user(app);
    return app
}