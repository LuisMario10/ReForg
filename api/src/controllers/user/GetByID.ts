import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import { TParamsProps } from "../@types";
import { z } from 'zod'

const paramValidator = z.object({
    id: z.string()
});

export const getByID = async (request: Request<TParamsProps>, response: Response) => {

    try {
        const { id } = paramValidator.parse(request.params);

        return response.status(StatusCodes.OK).json({ 
            statusCodes: StatusCodes.OK, 
            msg: "Usuario retornado", 
            datas: [
                { name: "Luis", email: "testando@email.com", createdAt: "22/10/2025" }
            ]
        });

    } catch(error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}
