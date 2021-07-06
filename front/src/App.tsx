import { FC, useEffect } from "react";
import useActions from "./hooks/useActions";
import useTypedSelector from "./hooks/useTypedSelector";
import PinsService from "./services/pinsService";

const App: FC = () => {
    const store = useTypedSelector(store => store);
    const {refreshAction, loginAction, logoutAction} = useActions();

    useEffect(() => {
        if(localStorage.getItem('uccessToken')){
            refreshAction();
        }
    }, [])

    return (
        <div className="App">
            <div onClick={() => loginAction({email: 'pavlovskiy.egor@inbox.ru', password: 'asdas978d798'})}>login</div>
            <div onClick={() => logoutAction()}>logout</div>
            <div onClick={async () => console.log(await PinsService.fetchPins())}>get pins</div>
            {store.auth.isAuth === true ? 'Приветик, ' + store.user.username : null}
        </div>
    );
};

export default App;