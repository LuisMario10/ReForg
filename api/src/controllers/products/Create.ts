import { Request, Response } from "express";
import * as yup from 'yup'

interface IProduct {
    name: string,
    price: number
}

const bodyValidation: yup.ObjectSchema<IProduct> = yup.object().shape({
    name: yup.string().required().min(2),
    price: yup.number().required()

});

export const create = async (request: Request<{}, {}, IProduct>, response: Response) => {
    let validationData: IProduct | undefined = undefined

    try {
        validationData = await bodyValidation.validate(request.body, { abortEarly: false });
        
    } catch(err) {
        const yupError = err as yup.ValidationError;

        const validationErrors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            if(!error.path) return;

            validationErrors[error.path] = error.message;
        })

        response.json({
            errors: {
                default: validationErrors
            }
        })
    }

    return response.status(201).json({ msg: "Produto Criado!!!" });   
}
