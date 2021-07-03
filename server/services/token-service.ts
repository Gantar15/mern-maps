import jwt from 'jsonwebtoken';
import type { Schema } from 'mongoose';
import Token, {IToken} from "../models/Token";

interface ITokensList{
    accessToken: string;
    refreshToken: string;
}
export type {ITokensList};

class TokenService{
    generateTokens(payload: object): ITokensList{
        const accessToken: string = jwt.sign(payload,
            process.env.JWT_ACCESS_SECRET!,
            {expiresIn: '25m'});
        const refreshToken: string = jwt.sign(payload,
            process.env.JWT_REFRESH_SECRET!,
            {expiresIn: '30d'});

        return {
            accessToken, refreshToken
        };
    }

    async saveToken(userId: Schema.Types.ObjectId, refreshToken: string): Promise<IToken>{
        const tokenData: IToken | null = await Token.findOne({user: userId});
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        const token = await Token.create({
            user: userId,
            refreshToken
        });
        return token;
    }

    async removeToken(refreshToken: string): Promise<IToken | null>{
        const tokenData: IToken | null = await Token.findOneAndDelete({refreshToken});
        return tokenData;
    }

    validateAccessToken(accessToken: string): any | null{
        try{
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
            return userData;
        } catch(err){
            return null;
        }
    }

    validateRefreshToken(refreshToken: string): any | null{
        try{
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
            return userData;
        } catch(err){
            return null;
        }
    }

    async findToken(refreshToken: string): Promise<IToken | null>{
        const tokenData: IToken | null = await Token.findOne({refreshToken});
        return tokenData;
    }
}

export default new TokenService();