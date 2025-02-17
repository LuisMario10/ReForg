import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export default class JWTValidate {
    public static tokenVerify(request: Request, response: Response, next: any) {
        try {
            const tokenHeader = request.headers['authorization'];
            const token = tokenHeader && tokenHeader.split(" ")[1];

            const tokenValidate = jwt.verify(String(token), String(process.env.SECRET)); 

            if(!token) response.status(401).json({ message: "Unauthorized User" });
            
            next();
        } catch {
            response.status(500).json({ message: "Server Internal Error" })
        }
    }
}
