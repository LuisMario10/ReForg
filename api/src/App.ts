import express, { Express } from 'express';
import { router } from './routes';
import "dotenv/config"
import "./shared/services/translationYUP"

const _APP: Express = express();

const _PORT: string | undefined = process.env.PORT;

_APP.use(express.json());

_APP.use(router);

_APP.listen(_PORT || 2345, () => {
    console.log(`ReForg esta no ar!!! - http://localhost:${_PORT}`);
});