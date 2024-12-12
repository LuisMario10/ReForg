import express, { Express } from 'express';
import _USER_ROUTER from './router/User.Route';

const _APP: Express = express();

const _PORT: string | number = process.env.PORT || 2345;

_APP.use(express.json());
_APP.use(_USER_ROUTER);

_APP.listen(_PORT, () => {
    console.log(`Server is Running: http://localhost:${_PORT}`);
});
