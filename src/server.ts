
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import router from './Routes/route.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);


app.listen(3000, ()=>console.log("Servidor rodando na porta 3000"))




