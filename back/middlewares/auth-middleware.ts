import { Request, Response } from "express";
import ServerError from "../utils/server-error";
import tokenService from "../services/token-service";

export default function(req: Request, resp: Response, next: Function){
    try{
        const accessToken: string | undefined = req.get('authorization')?.split(' ')[1];
        if(!accessToken){
            throw null;
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            throw null;
        }

        resp.locals.userData = userData;
        next();
    } catch(err){
        return next(ServerError.UnauthorizedError());
    }
}