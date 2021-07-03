import { Request, Response, Router } from "express";
import Pin from '../models/Pin';
import authMiddleware from '../middlewares/auth-middleware';

const router = Router();


//create a pin
router.post('/', authMiddleware, async (req: Request, resp: Response) => {
    const newPin = new Pin(req.body);
    try{
        const savedPin = await newPin.save();
        resp.status(200).json(savedPin);
    } catch(err){
       resp.status(500).json(err);
    }
});

//get all pins
router.get('/', authMiddleware, async (req: Request, resp: Response) => {
    try{
        const pins = await Pin.find();
        resp.status(200).json(pins);
    } catch(err){
        resp.status(500).json(err);
    }
});


export default router;