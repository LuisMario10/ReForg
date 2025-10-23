import express, { Express } from 'express';
import { router } from './routes';
import cookieParser from 'cookie-parser';
import cors from "cors"
import "dotenv/config"

const _APP: Express = express();

const _PORT: string | undefined = process.env.PORT;

_APP.use(express.json());
_APP.use(cookieParser());
_APP.use(cors());
_APP.use(router);

_APP.listen(_PORT || 2345, () => {
    console.log(`ReForg esta no ar!!! - http://localhost:${_PORT}`);
});