import express from 'express';
import serverConfig from './frameworks/webServer/server';
import connectDB from './frameworks/database/connection/connection';
import expressConfig from './frameworks/webServer/express';
import routes from './frameworks/webServer';
import errorHandler from './frameworks/webServer/middlewares/errorHandler';

const app = express();

connectDB();

expressConfig(app);

routes(app);

app.use(errorHandler);

serverConfig(app);
