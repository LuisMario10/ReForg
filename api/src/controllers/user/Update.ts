import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import { TBodyProps, TParamsProps } from "../@types";
import { z } from 'zod'

const paramValidator = z.object({
    id: z.string()
});

const bodyValidator = z.object({
    name: z.string().min(2, { message: "Nome curto demais" }),
    email: z.email().min(6, { message: "Email curto demais"}),
    cpf: z.string().max(11, { message: "CPF invalido" }),
    password: z.string().length(8, { message: "Senha deve conter 8 caracteres" })
});

export const update = async (request: Request<TParamsProps, {}, TBodyProps>, response: Response) => {

    try {
        const { id } = paramValidator.parse(request.params);

        const { name, email, password, cpf } = bodyValidator.parse(request.body);

        return response.status(StatusCodes.NO_CONTENT).json({ statusCodes: StatusCodes.NO_CONTENT, msg: "Usuario atualizado com sucesso" });

    } catch(error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}
