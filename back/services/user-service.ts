import bcrypt from 'bcrypt';
const uuid = require('uuid');
import User, {IUser} from "../models/User";
import mailService from './mail-service';
import tokenService, {ITokensList} from './token-service';
import UserDto from '../utils/user-dto';
import ServerError from '../utils/server-error';
import Token, { IToken } from '../models/Token';


interface IUserData extends ITokensList{
    user: UserDto;
}
export type {IUserData};


class UserService{
    async registration(username: string, email: string, password: string): Promise<IUserData>{
        const emailCandidate: IUser | null = await User.findOne({email});
        if(emailCandidate){
            throw ServerError.BadRequestError(`Пользователь с почтой ${email} уже зарегестрирован`);
        }

        const usernameCandidate: IUser | null = await User.findOne({username});
        if(usernameCandidate){
            throw ServerError.BadRequestError(`Имя ${username} уже занято другим пользователем`);
        }

        const salt: string = await bcrypt.genSalt(11);
        const hashPassword: string = await bcrypt.hash(password, salt);
        const activationLink: string = uuid.v4();
        const newUserObj: IUser = await User.create({
            username, 
            email, 
            password: hashPassword,
            activationLink
        });

        mailService.sendMail(username, email, process.env.SITE_URL + '/api/users/activate/' + activationLink);
        const userDto = new UserDto(newUserObj);
        const tokens: ITokensList = tokenService.generateTokens({...userDto});
        tokenService.saveToken(newUserObj.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async activate(activationLink: string): Promise<void>{
        const candidate: IUser | null = await User.findOne({activationLink});
        if(!candidate){
            throw ServerError.BadRequestError(`${activationLink} - некорректная ссылка активации`);
        }

        candidate.activationLink = '';
        candidate.isActivated = true;
        await candidate.save();
    }

    async login(email: string, password: string): Promise<IUserData>{
        const candidate: IUser | null = await User.findOne({email});
        if(!candidate){
            throw ServerError.BadRequestError('Пользователь с указанной почтой не найден');
        }
        const isPasswordCurrect: boolean = await bcrypt.compare(password, candidate.password);
        if(!isPasswordCurrect){
            throw ServerError.BadRequestError('Неверный пароль');
        }

        const userDto: UserDto = new UserDto(candidate);
        const tokens: ITokensList = tokenService.generateTokens({...userDto});
        tokenService.saveToken(candidate.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async logout(refreshToken: string): Promise<IToken | null>{
        const token: IToken | null = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken: string): Promise<IUserData>{
        if(!refreshToken){
            throw ServerError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb: IToken | null = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb){
            throw ServerError.UnauthorizedError();
        }

        const {user} = await Token.findOne({refreshToken}).populate('user');
        const userDto: UserDto = new UserDto(user);
        const tokens: ITokensList = tokenService.generateTokens({...userDto});
        tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }
}

export default new UserService();