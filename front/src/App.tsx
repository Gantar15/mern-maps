import { FC, useEffect, useState } from "react";
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from '@material-ui/icons';
import useActions from "./hooks/useActions";
import useTypedSelector from "./hooks/useTypedSelector";
import PinsService from './services/pinsService';
import RangeField from "./components/RangeField";
import type {IRequestPinData} from './types/IPin';

import './App.css';
import baseStyleImg from './imgs/base.png';
import outdoorsStyleImg from './imgs/outdoors.png';
import streetsStyleImg from './imgs/streets.jpg';
import Register from "./components/Register";
import Login from "./components/Login";


const App: FC = () => {
    const store = useTypedSelector(store => store);
    const {refreshAction, setPinsAction, logoutAction} = useActions();
    const [viewport, setViewport] = useState({
        width: document.body.offsetWidth,
        height: window.innerHeight,
        latitude: 53.9,
        longitude: 27.5664,
        zoom: 5
    });
    const [currentPlace, setCurrentPlace] = useState<string | null>(null);
    const [newPlace, setNewPlace] = useState<null | {lat: number, long: number}>(null);
    const [mapStyle, setMapStyle] = useState(localStorage.getItem('mapStyle') || 'mapbox://styles/gnida-tvar/ckqtrji6t020h18uvi6amfmw9');
    const [showRegister, setShowRegister] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);

    useEffect(() => {
        //Refresh access token (and get authentificated user info)
        if(localStorage.getItem('accessToken')){
            refreshAction();
        }

        PinsService.fetchPins().then(pins => {
            setPinsAction(pins);
        });
    }, []);

    function dateFormat(dateStr: Date): string{
        const date = new Date(dateStr);
        return date.toLocaleString('en', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    function handleMarkerClick(id: string, lat: number, long: number){
        if(id === currentPlace){
            setCurrentPlace(null);
        } else
            setViewport({
                ...viewport,
                latitude: lat,
                longitude: long
            });
            setCurrentPlace(id);
    }

    function handleAddClick(ev: any){
        const [long, lat] = ev.lngLat;
        setNewPlace({
            lat,
            long
        });
    }

    function handleSubmit(ev: any){
        ev.preventDefault();
        let {rating: {value: rating}, desc: {value: desc}, title: {value: title}} = ev.target;
        const newPin: IRequestPinData = {
            lat: newPlace!.lat,
            long: newPlace!.long,
            user: store.user.id,
            rating, 
            desc, 
            title
        }
        PinsService.createPin(newPin);
        setNewPlace(null);
    }

    function mapStyleHandler(ev: any){
        const target = ev.target;
        const stylesNode = target.closest('li[data-map-style-url]');
        if(!stylesNode) return;

        setMapStyle(stylesNode.dataset.mapStyleUrl);
        localStorage.setItem('mapStyle', stylesNode.dataset.mapStyleUrl);
    }

    return (
        <div className="App">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={setViewport}
                mapStyle={mapStyle}
                onDblClick={store.user?.username ? handleAddClick : () => {}}
                transitionDuration={20}
            >
                {
                    store.pins.map(pin => {
                        return (
                            <>
                                <Marker
                                    offsetTop={-7 * viewport.zoom}
                                    offsetLeft={-3.5 * viewport.zoom}
                                    latitude={pin.lat} 
                                    longitude={pin.long}>
                                    <Room 
                                     style={{
                                        fontSize: viewport.zoom*7,
                                        color: store.user.id === pin.user.id ? '#1177DE' : '#A477DE',
                                        cursor: 'pointer'
                                     }}
                                     onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
                                    />
                                </Marker>
                                {pin._id === currentPlace &&
                                <Popup
                                 latitude={pin.lat}
                                 longitude={pin.long}
                                 closeButton={true}
                                 closeOnClick={false}
                                 onClose={() => setCurrentPlace(null)}
                                 anchor="left">
                                    <div className="card">
                                        <label>Place</label>
                                        <h4 className="place">{pin.title}</h4>
                                        <label>Review</label>
                                        <p className="desc">{pin.desc}</p>
                                        <label>Rating</label>
                                        <div className="stars">
                                            {Array(pin.rating).fill(<Star className="star" style={{color: 'gold'}} />)}
                                            {Array(5 - pin.rating).fill(<Star className="star" style={{color: '#9A9A9A'}} />)}
                                        </div>
                                        <label>Information</label>
                                        <span className="username">
                                            Created by <b>{pin.user.username}</b>
                                        </span>
                                        <span className="date">{dateFormat(pin.createdAt)}</span>
                                    </div>
                                </Popup>}
                            </>
                        );
                    })
                }
                {newPlace && <Popup
                    latitude={newPlace.lat}
                    longitude={newPlace.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setNewPlace(null)}
                    anchor="left">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>Title</label>
                            <input name="title" type="text" placeholder="Enter a title"/>
                            <label>Review</label>
                            <textarea name="desc" placeholder="Say something about this place" cols={20} rows={4}></textarea>
                            <label>Rating</label>
                            <RangeField name="rating" max={5} min={0} />
                            <button className="submitButton" type="submit">Add pin</button>
                        </form>
                    </div>
                </Popup>}
                <nav className="navigation">
                    <ul className="map-styles" onClick={mapStyleHandler}>
                            <li data-map-style-url="mapbox://styles/gnida-tvar/ckqwnibvza7u918o9pba9xoxj">
                                <img src={baseStyleImg}/>
                            </li>
                            <li data-map-style-url="mapbox://styles/gnida-tvar/ckqwnlg9x085117qst1c8id0f">
                                <img src={outdoorsStyleImg}/>
                            </li>
                            <li data-map-style-url="mapbox://styles/gnida-tvar/ckqtrji6t020h18uvi6amfmw9">
                                <img src={streetsStyleImg}/>
                            </li>
                    </ul>
                    <section className="user-actions">
                        {!store.user.id ? 
                            (<>
                                <button onClick={() => {
                                    setShowRegister(false);
                                    setShowLogin(true);
                                }} className="login">Login</button>
                                <button onClick={() => {
                                    setShowLogin(false);
                                    setShowRegister(true);
                                    }} className="register">Register</button>
                            </>) : 
                            (<div className="name-block">
                                <p>{store.user.username}</p>
                                <button onClick={logoutAction} className="logout">Logout</button>
                            </div>)
                        }
                    </section>
                </nav>

                {
                    showRegister && <Register setShowRegister={setShowRegister}/>
                }
                {
                    showLogin && <Login setShowLogin={setShowLogin}/>
                }
            </ReactMapGL>
        </div>
    );
};

export default App;