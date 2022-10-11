import express from 'express';
import cors from 'cors';
import routers from '../routers';

const loadExpress = async ({ app }) => {

    app.use(cors());

    app.use(express.json());

    app.use('/api', routers());

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        console.log(err)
        res.status(err.status || 500);
        res.json({
            error: err,
        });
    });

};

export default loadExpress;