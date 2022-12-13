import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './handlers/products';
import userRoute from './handlers/users';
import ordersRoute from './handlers/orders';

const app: express.Application = express();
const port = '3000';

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (_req: Request, res: Response) {
    res.send('Udacity Store-front!');
});

productRoutes(app);
userRoute(app);
ordersRoute(app);

app.listen(port, function () {
    console.log(`starting app on: ${port}`);
});

export default app;
