import express, { Request, Response } from 'express';
import routesBook from '../routes/book';
import routesUser from '../routes/user';
import routesAuth from '../routes/auth';
import db from '../db/connection';
import cors from 'cors';
class Server {
    private app: express.Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application Running on Port ${this.port}`)
        })
    }
    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: `API Working`
            })
        });
        this.app.use('/api/books', routesBook);
        this.app.use('/api/users',routesUser);
        this.app.use('/auth', routesAuth);
    }
    middlewares() {
        this.app.use(express.json());
        // Cors
        this.app.use(cors());
    }
    async dbConnect() {

        try {
            await db.authenticate();
            console.log("DB Connected");
        } catch (error) {
            console.log(error);
            console.log('error db');

        }
    }
}



export default Server;