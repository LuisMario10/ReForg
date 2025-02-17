import { Router } from 'express';
import UserController from '../controllers/User.Controller';
import Auth from '../controllers/Auth.Controller';
import JWTValidate from '../shared/middlewares/JWTValaidate.Midd';

export const _USER_ROUTER: Router = Router();

_USER_ROUTER.get("api/v1/g/reforg", (_, response) => {
    response.status(200).send({ menssage: "Reforg Games" });
});

_USER_ROUTER.get("/api/v1/g/user/all", (request, response) => {
    UserController.getAll(request, response);
});

_USER_ROUTER.get("/api/v1/g/user/id", (request, response, next) => {
    JWTValidate.tokenVerify(request, response, next);
}, (request, response) => {
    UserController.getById(request, response);
});

_USER_ROUTER.post("/api/v1/p/user/auth", (request, response) => {
    Auth.login(request, response);
});

_USER_ROUTER.post("/api/v1/p/register", (request, response) => {
    UserController.post(request, response);
});

_USER_ROUTER.put("api/v1/p/user/id", (request, response, next) => {
    JWTValidate.tokenVerify(request, response, next); 
},(request, response) => {
    UserController.putName(request, response);
});

_USER_ROUTER.put("api/v1/p/user/email", (request, response, next) => {
    JWTValidate.tokenVerify(request, response, next);
},(request, response) => {
    UserController.putEmail(request, response);
});

_USER_ROUTER.delete("api/v1/d/user", (request, response, next) => {
    JWTValidate.tokenVerify(request, response, next)
}, (request, response) => {
    UserController.delete(request, response);
});
