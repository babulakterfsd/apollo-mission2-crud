import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoute } from './modules/student/student.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/students', StudentRoute);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to curd project of apollo b2 with Babul Akter',
  });
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

export default app;
