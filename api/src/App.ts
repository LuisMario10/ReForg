import express, { Express } from 'express';
import { _USER_ROUTER } from './router/User.Router';
import CorsConfig from './shared/middlewares/Cors.Config';

export const _APP: Express = express();

const _PORT: string | number = process.env.PORT || 2345;

_APP.use(express.json());
_APP.use((request, response, next) => CorsConfig.config(request, response, next))
_APP.use(_USER_ROUTER);

_APP.listen(_PORT, () => {
    console.log(`Server is Running: http://localhost:${_PORT}`);
});
