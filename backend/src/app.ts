import express, { Application } from 'express';
import http from 'http'
import { Server } from 'socket.io';
import serverConfig from './frameworks/webServer/server';
import connectDB from './frameworks/database/connection/connection';
import expressConfig from './frameworks/webServer/express';
import routes from './frameworks/webServer';
import errorHandler from './frameworks/webServer/middlewares/errorHandler';
import socketConfig from './frameworks/webSocket/socket';

const app: Application = express();

const server = http.createServer(app)

const io = new Server( server, {
    cors: {
        origin: "http://localhost:5173",
        // origin: ["https://twiddles.online", "https://www.twiddles.online"],
        methods:["GET","POST", "PUT", "PATCH", "DELETE"]
    }
})

socketConfig(io);

connectDB();

expressConfig(app);

routes(app);

app.use(errorHandler);

serverConfig(server);
