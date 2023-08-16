import express, { Application } from 'express'
import morgan from 'morgan';
import cors from 'cors';

// const corsOption = {
//     origin: "http://localhost:5173/",
//     exposedHeaders: ['Cross-Origin-Opener-Policy', 'Cross-Origin-Resource-Policy'],
// }

const expressConfig = ( app: Application ) => {

    app.use(cors())
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
}

export default expressConfig;