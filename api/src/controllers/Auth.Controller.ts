import { Request, Response } from "express";
import UserModel from "../domain/User/User.Model";
import UserRepository from "../domain/User/User.Repository";
import Hash from "../shared/services/Hash.Service"
import jwt from "jsonwebtoken";


export default class Auth {
    public static async login(request: Request<{}, {}, UserModel>, response: Response) {
        try {
            const { email, password } = request.body;
            
            if(!email || email.length <= 0 || email === "")
                response.status(422).json({ statusCode: 422, messege: "Email cannot be null" });

            if(!password || password.length <= 0 || password === "") 
                response.status(422).json({ statusCode: 422, messege: "Password cannot be null" });

            const user = await UserRepository.findByEmail(email);

            if(!user) 
                response.status(402).json({ statusCode: 402, messege: "Unathorized" });

            const passwordReal: boolean = await Hash.decodeHash(password, String(user?.password));
            
            if(!passwordReal)  
                response.status(402).json({ statusCode: 402, message: "Unauthorized" });

            const secret: string = String(process.env.SECRET);

            const token: string = jwt.sign({ id: user?.id }, secret);

            response.status(200).json({ statusCode: 200, message: "User Authorized!!!", token });
        } catch {
            response.status(500).json({ statusCode: 500, message: "Server internal error" });
        }
    }
}