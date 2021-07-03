
import express, {Application, Request, Response} from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
const cors = require('cors');
require('dotenv').config();
import pinRoute from './routes/pins';
import userRoute from './routes/users';
import errorMiddleware from './middlewares/error-middleware';

const app: Application = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/pins/', pinRoute);
app.use('/api/users/', userRoute);
app.use(errorMiddleware);


mongoose.connect(process.env.DB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.get('', (req: Request, resp: Response) => {
});


app.listen(PORT, () => {
    console.log(`Server was started on port ${PORT}`);
});