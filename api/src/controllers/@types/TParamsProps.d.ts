import jwt from "jsonwebtoken"

export type TParamsProps = {
    id?: string
    user?: string | jwt.JwtPayload
}