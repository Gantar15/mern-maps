import { Request, Response } from "express";
import ServerError, {Error} from "../utils/server-error";

export default function(err: Error, req: Request, resp: Response, next: Function){
    console.log(err);

    if(err instanceof ServerError){
        return resp.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }

    resp.status(500).json({subject: 'Непредвиденная ошибка на сервере', message: err.message});
}