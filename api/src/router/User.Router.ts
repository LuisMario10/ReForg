import { Router } from 'express'
import UserController from '../controllers/UserController';

const _USER_ROUTER: Router = Router();

_USER_ROUTER.get("/reforg/app", (_, response) => {
    response.status(200).send({ msg: "Reforg Games" });
});

_USER_ROUTER.post("/api/v1/register", (request, response) => {
    UserController.create(request, response);
});

export default _USER_ROUTER;