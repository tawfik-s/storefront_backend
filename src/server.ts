import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRouter from './routes/productRouter';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import orderRouter from './routes/orderRouter';
const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req: Request, res: Response) {
  res.send('welcome in storefornt backend API');
});
app.use('/product', productRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/orders', orderRouter);

app.listen(process.env.PORT || 3000, function () {
  console.log(`starting app on: ${process.env.PORT || 3000}`);
});

export default app;
