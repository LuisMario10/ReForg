import { Request, Response } from "express";
import UserModel from "../domain/User/User.Model";
import UserRepository from "../domain/User/User.Repository";

export default class UserController {

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    public static create(request: Request<{}, {}, UserModel>, response: Response) {
        try {
            const { name, email, CPF ,password, passwordConfirm } = request.body;

            if(name == undefined || name.length <= 0 || name === "") response.status(422).json({ statusCode: 422, message: "Name field cannot be empty!" })

            if(name.length < 2) response.status(422).json({ statusCode: 422, message: "It is not possible to register a name with less than 2 letters!" })

            if(email == undefined || email.length <= 0 || email == "") response.status(422).json({ statusCode: 422, message: "Email field cannot be empty" })

            if(password == undefined || password.length <= 0 || password === "") response.status(422).json({ statusCode: 422, message: "Passoword field cannot be empty" })

            if(password.length < 8 || password.length > 8) response.status(422).json({ statusCode: 422, message: "Password field must contain 8 digits!" })

            if(password !== passwordConfirm) response.status(422).json({ statusCode: 422, message: "Password and confirmation password fields must be the same!" })


            UserRepository.create(new UserModel(name, email, CPF, password))

            response.status(201).json({ message: "Password and confirmation password fields must be the same" });
        } catch {
            response.status(500).json({ message: "Server internal error" });
        }
    }

}