// @ts-nocheck
import 'dotenv/config.js';
import express from 'express';
import rosterRoutes from './routes/roster.js';
import cors from 'cors';
const app = express();
const port = 3000;
// TODO: Add CORS protection
app.use(cors());
app.use(express.json());
app.use('/roster', rosterRoutes);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
