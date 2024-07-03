import express, {Express, Request, Response, Router} from 'express';
import dotenv from 'dotenv';
var cors = require('cors');
import { connectDatabase } from './connectDb';
import { CONFIG } from './config';
const route = require('./routeHandlers/route');
dotenv.config();
const app: Express = express();
connectDatabase(app);
app.use(express.json());
app.use(cors())
app.use('/', route)

app.use(({err, req, res} : {err: any, req: Request, res: Response}) => {
    if(err) {
        console.error(err.stack); // Log the error for debugging
        res.status(500).send({status: 500, message: 'Internal Server Error', data: null}); // Send a generic error response
    }
  });

app.listen(process.env.PORT, () => console.log("Server is Successfully Running, and App is listening on port "+ CONFIG.PORT));