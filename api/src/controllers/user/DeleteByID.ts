import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TParamsProps } from '../@types';
import { z } from 'zod';

const paramValidator = z.object({
    id: z.string()
});

export const deleteByID = (request: Request<TParamsProps>, response: Response) => {
    try {
        const { id } = paramValidator.parse(request.params); 

        return response.status(StatusCodes.NO_CONTENT).json({ statusCodes: StatusCodes.NO_CONTENT, msg: "Usuario deletado" });

    } catch(error) {    
        
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

