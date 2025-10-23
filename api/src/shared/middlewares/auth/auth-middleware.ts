import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { TParamsProps } from "../../../controllers/@types";
import jwt from "jsonwebtoken";

export const auth = (request: Request<TParamsProps>, response: Response, next: NextFunction) => {
    const token = request.cookies?.token;

    if (!token) return response.status(StatusCodes.UNAUTHORIZED).json({ message: "Token não fornecido" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        request.params.user = decoded;

        next();
    } catch (err) {
        response.status(StatusCodes.FORBIDDEN).json({ statusCodes: StatusCodes.FORBIDDEN, message: "Token inválido ou expirado" });
    }
};
