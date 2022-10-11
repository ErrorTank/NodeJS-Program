
import express from 'express';

async function startServer() {
    const app = express();
    await require('./loaders').default({ app });

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port: `, process.env.PORT);
    }).on('error', err => {
        console.error(err);
        process.exit(1);
    });

}

startServer();