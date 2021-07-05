
interface IReducerAction<T>{
    type: string;
    payload: T
}

export type {IReducerAction};