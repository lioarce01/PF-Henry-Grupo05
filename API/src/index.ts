import 'dotenv/config';
import express from 'express';
import { PrismaClient } from "@prisma/client";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes/index';
import cors from 'cors';
import verifyPayment from './middleware/plans';
import schedule from "node-schedule"


const app = express();
const prisma = new PrismaClient();


app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());

schedule.scheduleJob("0 0 1-31 * *", () => {verifyPayment()})

app.use('/', routes);

export default app;