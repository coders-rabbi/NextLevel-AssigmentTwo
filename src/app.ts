import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/models/users.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//applications routes
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

export default app;
