
export class Error{
    constructor(public message: string){}
}

export default class ServerError extends Error{
    status: number;
    errors: any[];

    constructor(status: number, message: string, errors: any[] = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(){
        return new ServerError(401, 'Пользователь не авторизирован');
    }

    static BadRequestError(message: string, errors: any[] = []){
        return new ServerError(400, message, errors);
    }
}