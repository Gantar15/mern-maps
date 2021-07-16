import { Request, Response, Router } from "express";
import Pin from '../models/Pin';
import authMiddleware from '../middlewares/auth-middleware';
import type {IPin} from '../models/Pin';
import PinDto from "../utils/pin-dto";
import { IUser } from "../models/User";

const router = Router();


//create a pin
router.post('/', authMiddleware, async (req: Request, resp: Response) => {
    const newPin = new Pin(req.body);
    try{
        const savedPin: IPin = await newPin.save();
        resp.status(200).json(savedPin);
    } catch(err){
       resp.status(500).json(err);
    }
});

//get all pins
router.get('/', async (req: Request, resp: Response) => {
    try{
        const pins: IPin[] = await Pin.find({}).populate('user');
        const newPins = pins.map(pin => {
            const pinDto = new PinDto(pin);
            return pinDto;
        });
        resp.status(200).json(newPins);
    } catch(err){
        resp.status(500).json(err);
    }
});


export default router;