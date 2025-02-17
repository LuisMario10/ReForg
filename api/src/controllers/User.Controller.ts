import { Request, Response } from "express";
import UserModel from "../domain/User/User.Model";
import UserRepository from "../domain/User/User.Repository";
import Hash from "../shared/services/Hash.Service";

export default class UserController {

    public static async post(request: Request<{}, {}, UserModel>, response: Response) {
        try {
            const { name, email, password, passwordConfirm } = request.body

            if(name == undefined || name.length <= 0 || name === "") 
                response.status(422).json({ 
                    statusCode: 422, 
                    message: "Name field cannot be empty!" 
                }) 

            if(name.length < 2) 
                response.status(422).json({ 
                    statusCode: 422, 
                    message: "It is not possible to register a name with less than 2 letters!" 
                })

            if(email == undefined || email.length <= 0 || email == "") 
                response.status(422).json({ 
                    statusCode: 422, 
                    message: "Email field cannot be empty" 
                })

            if(password == undefined || password.length <= 0 || password === "") 
                response.status(422).json({ 
                    statusCode: 422, 
                    message: "Passoword field cannot be empty" 
                })

            if(password.length < 8 || password.length > 8) 
                    response.status(422).json({ 
                    statusCode: 422, 
                    message: "Password field must contain 8 digits!"
                })

            if(password !== passwordConfirm) 
                response.status(422).json({ 
                    statusCode: 422, 
                    message: "Password and confirmation password fields must be the same!" 
                })

            const passwordHashed: string = await Hash.generateHash(password);

            UserRepository.create(new UserModel(name, email, passwordHashed));

            response.status(201).json({
                    statusCode: 201, 
                    message: "Password and confirmation password fields must be the same" 
                });
        } catch {
            response.status(500).json({ 
                statusCode: 500, 
                message: "Server internal error" 
            });
        }
    }
    
    public static async getAll(request: Request<{}, {}, UserModel>, response: Response) {
        try {
            const datas = await UserRepository.findAll();
            console.log(datas);
            return response.status(200).json({ 
                statusCode: 200, 
                message: "All data from all users was accessed", 
                result: datas
            });
            
        } catch {
            response.status(500).json({ stausCode: 500, message: "Server internal error" })
        }
    }

    public static async getById(request: Request<{}, {}, UserModel>, response: Response) {
        try {
            if(request.body.id === undefined || request.body.id.length <= 0) 
                response.status(422).json({ statusCode: 422, message: "Id cannot is null" });

            const data = await UserRepository.findById(String(request.body.id));
            response.status(200).json({ statusCode: 200, message: "All data from user was accessed" })

        } catch {
            response.status(500).json({ statusCode: 500, message: "Server internal error" })
        }
    }

    public static async getByEmail(request: Request<{}, {}, UserModel>, response: Response) {
        try {
            if(request.body.email === undefined || request.body.email.length <= 0) 
                response.status(422).json({ statusCode: 422, message: "Email cannot is null" });

            const datas = UserRepository.findByEmail(String(request.body.email));
            response.status(200).json({ statusCode: 200, message: "All data from user was accessed" });

        } catch {
            response.status(500).json({ statusCode: 500, message: "Server internal error" })
        }
    }

    public static async putName(request: Request<{}, {}, UserModel>, response: Response) {
        try {
            const { name, email, password, passwordConfirm } = request.body;

            const data = await UserRepository.findByEmail(String(email));
            const userDataUpdate = new UserModel(name, String(data?.email), String(data?.code_cpf), String(data?.password));

            if(name === null || name === undefined) 
                response.status(422).json({ statusCode: 422, message: "Name cannot be null" });

            if(name === data?.name) 
                response.status(422).json({ statusCode: 422, message: "The new name cannot be similar to the current name" });

            if(email !== data?.email || password !== data?.password) 
                response.status(401).json({ statusCode: 401, message: "Unauthorized change!" });

            if(password !== passwordConfirm) 
                response.status(422).json({ 
                statusCode: 422, 
                message: "password field and confirmation password field must be the same" 
            })

            UserRepository.update(String(data?.id), userDataUpdate);

            response.status(201).json({ statusCode: 201, message: "Username changed successfully!" });

        } catch {
            response.status(500).json({ statusCode: 500, message: "Server internal error" });
        }
    }

    public static async putEmail(request: Request<{}, {}, UserModel>, response: Response) {
        try {
            
            const { name, email, password, passwordConfirm } = request.body;

            const data = await UserRepository.findByEmail(String(email));
            const userDataUpdate = new UserModel(name, String(data?.email), String(data?.code_cpf), String(data?.password));

            if(name === null || name === undefined) 
                response.status(422).json({ statusCode: 422, message: "Name cannot be null" });

            if(name === data?.name) 
                response.status(422).json({ statusCode: 422, message: "The new name cannot be similar to the current name" });
            

            UserRepository.update(String(data?.id), userDataUpdate);

            response.status(201).json({ statusCode: 201, message: "Username changed successfully!" });
        } catch {
            response.status(500).json({ statusCode: 500, message: "Server internal error" })
        }
    }

    public static async delete(request: Request<{}, {}, UserModel>, response: Response) {
        try {
            const { email, password } = request.body;

            if(!email) response.status(402).json({ statusCode: 402, message: "Email field cannot be empty!!!" });
            if(!password) response.status(402).json({ statusCode: 402, message: "Password field cannot be empty!!!" })

            const user = await UserRepository.findByEmail(String(email));
            UserRepository.delete(String(user?.id));
        } catch {
            response.status(500).json({ statusCode: 500, message:  "Server internal Error"});
        }
    }

}