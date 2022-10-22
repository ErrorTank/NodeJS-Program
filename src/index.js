
import express from 'express';
import Logger from './logger';

async function startServer() {
    const app = express();
    await require('./loaders').default({app});

    app.listen(process.env.PORT, () => {
        Logger.info(`Server is running on port: %d`, process.env.PORT);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
    });

}

startServer();

process.on('uncaughtException', function (err) {
    Logger.error(err);
    process.exit(1)
})