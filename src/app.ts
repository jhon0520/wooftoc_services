import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'
import cors from 'cors';

import userRoutes from './routes/users';
import petRoutes from './routes/pets'

class Application{

    app : express.Application;

    constructor(){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port', process.env.PORT || 4000);
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(cors());
    }

    routes(){
        this.app.use('/api', [userRoutes, petRoutes]);
    }

    start(){
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`Server is running on port ${this.app.get('port')}`);
        });
    }

}

export default Application;