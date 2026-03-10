import express from 'express';
import menuRouter from './routes/menu';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/api/menu', menuRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
