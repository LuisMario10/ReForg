import { Request, Response, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { TBodyProps } from "../@types";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const bodyValidator = z.object({
    email: z.email().min(6),
    password: z.string().length(8)
})

const users: any[] = [] //Simulando banco em memoria enquanto nao integro banco de dados

export const login: RequestHandler = async (request: Request<{}, {}, TBodyProps>, response: Response) => {

    const { email, password } = bodyValidator.parse(request.body);

    const user = users.find(u => u.email === email);

    if (!user) return response.status(400).json({ message: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return response.status(400).json({ message: "Email ou Senha invalidos" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
    });

    response.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    });

    response.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, msg: "Usuario Logado", token });
};
