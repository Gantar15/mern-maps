import type {IUser} from './IUser';

interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
export type {AuthResponse};