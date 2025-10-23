import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TQueryProps } from "../@types";
import { z } from 'zod';

const queryValidation = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    filter: z.string().optional()
})

export const getAll = async (request: Request<{}, {}, {}, TQueryProps>, response: Response) => {

    const { page, filter, limit } = queryValidation.parse(request.query);

    response.setHeader('access-control-expose-headers', 'x-total-count');
    response.setHeader('x-total-count', 1);

    try {
        return response.status(StatusCodes.OK).json({ 
            statusCode: StatusCodes.OK,
            msg: "Usuario retornado", 
            datas: [
                { name: "Luis", email: "testando@email.com", createdAt: "22/10/2025" }
            ]
        });

    } catch(error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, error });
    }
}
