import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req: Request, res: Response) {
  res.send('welcome in storefornt backend API');
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`starting app on: ${process.env.PORT || 3000}`);
});
