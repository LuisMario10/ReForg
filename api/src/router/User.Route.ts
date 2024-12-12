import { Router } from 'express'

const _USER_ROUTER: Router = Router();

_USER_ROUTER.get("/", (request, response) => {
    response.status(200).send({ msg: "Foi" });
});

export default _USER_ROUTER;