import { Request, Response } from "express";
import { _APP } from "../../App";
import cors from "cors"

export default class CorsConfig {
    public static config(request: Request, response: Response, next: any) {
        response.header("Access-Control-Allow-Origin", "*");

        response.header("Access-Control-Allow-Method", "GET, PUT, POST, DELETE");

        response.header("Access-Control-Allow-Headers", "Content-Type");

        _APP.use(cors());

        next()
    }
}