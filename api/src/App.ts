import express, { Express } from 'express';

const _APP: Express = express();

const _PORT: string | undefined = process.env.PORT;

_APP.use(express.json());

_APP.listen(_PORT || 2345, () => {
    console.log(`ReForg esta no ar!!! - http://localhost:${_PORT}`);
});