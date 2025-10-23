import { Request, Response } from "express"
 
export const logout = (request: Request, response: Response) => {
  response.clearCookie("token");
  response.json({ message: "Usuario deslogado!" });
};