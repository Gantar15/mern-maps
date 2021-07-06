import { Request, Response, Router } from "express";
import userService, {IUserData} from "../services/user-service";
import ServerError from "../utils/server-error";
import { body, validationResult } from 'express-validator';

const router = Router();


function setCookieToken(resp: Response, refreshToken: string){
    resp.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 30*24*60*60*1000
    });
}

router.post('/registration', 
  body('username').isLength({min: 3, max: 20}).withMessage('Некорректное имя пользователя'),
  body('email').isEmail().withMessage('Некорректный email'),
  body('password').isLength({min: 3, max: 32}).withMessage('Некорректный пароль'),
  async (req: Request, resp: Response, next: Function) => {
    try{
        const result = validationResult(req);
        if(!result.isEmpty()) throw ServerError.BadRequestError("Ошибка валидации", result.array());
        const {username, email, password}: {username: string, email: string, password: string} = req.body;
        const userData: IUserData = await userService.registration(username, email, password);
        setCookieToken(resp, userData.refreshToken);
        resp.json(userData);
    } catch(err){
        next(err);
    }
});

router.post('/login', async (req: Request, resp: Response, next: Function) => {
    try{
        const {email, password}: {email: string, password: string} = req.body;
        const userData = await userService.login(email, password);
        setCookieToken(resp, userData.refreshToken);
        resp.json(userData);
    } catch(err){
        next(err);
    }
});

router.get('/logout', async (req: Request, resp: Response, next: Function) => {
    try{
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken);
        resp.clearCookie('refreshToken');
        resp.json(token);
    } catch(err){
        next(err);
    }
});

router.get('/activate/:link', async (req: Request, resp: Response, next: Function) => {
    try{
        await userService.activate(req.params.link);
        resp.redirect(process.env.CLIENT_URL!);
    } catch(err){
        next(err);
    }
});

router.get('/refresh', async (req: Request, resp: Response, next: Function) => {
    try{
        const {refreshToken} = req.cookies;
        const data: IUserData = await userService.refresh(refreshToken);
        setCookieToken(resp, data.refreshToken);
        resp.json(data);
    } catch(err){
        next(err);
    }
});


export default router;