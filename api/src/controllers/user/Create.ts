import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import { TBodyProps } from "../@types";
import { z } from 'zod'

const bodyValidator = z.object({
    name: z.string().min(2, { message: "Nome curto demais" }),
    email: z.email().min(6, { message: "Email curto demais"}),
    cpf: z.string().max(11, { message: "CPF invalido" }),
    password: z.string().length(8, { message: "Senha deve conter 8 caracteres" })
});

export const create = async (request: Request<{}, {}, TBodyProps>, response: Response) => {

    try {
        const { name, email, password, cpf } = bodyValidator.parse(request.body);

        return response.status(StatusCodes.CREATED).json({ statusCodes: StatusCodes.CREATED, msg: "Usuario criado com sucesso", data: { id: 1 } });

    } catch(error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}
