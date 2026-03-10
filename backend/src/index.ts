import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import menuRouter from './routes/menu';
import authRouter from './routes/auth';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
