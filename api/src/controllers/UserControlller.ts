import { Request, Response } from "express";
import UserModel from "../domain/User/User.Model";
import UserRepository from "../domain/User/User.Repository";
import { STATUS_CODES } from "http";

export default class UserController {

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    public static create(request: Request<{}, {}, UserModel>, response: Response) {
        try {
            const { name, email, CPF ,password, passwordConfirm } = request.body;
            const user: UserModel = new UserModel(name, email, CPF, password);

            if(name == undefined || name.length <= 0 || name === "") response.status(422).json({ message: "Name field cannot be empty!" })
            if(name.length < 2) response.status(422).json({ message: "It is not possible to register a name with less than 2 letters!" })

            UserRepository.create(user)

            response.status(201).json({ message: "Usuario criado" });
        } catch {
            response.status(500).json({ message: "Server internal error" })
        }
    }

}