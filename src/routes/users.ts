import {Router, Request, Response} from 'express';

import User from '../models/user_model'
import MailOptions from '../logic/mailOptions';

class UserRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes;
    };

    async getUser(request : Request, response : Response){
        const users = await User.find().populate('pets');
        response.json(users);
    }

    async createUser(request : Request, response : Response){

        const mail = new MailOptions();
        
        const {name, phone, email, password} = request.body;
        const newUser =  await new User({name, phone, email, password});

        await newUser.save().catch((error)=>{
            return response.status(404).send({response: false, message : error.message});
        }).then(()=>{
            let userchanged = newUser.toJSON();
            delete userchanged.password;
            mail.send(email);
            return response.status(202).send(userchanged);
        });
    }

    async validateUser(request : Request, response : Response){

        const {email, password } = request.body;
        const user = await User.findOne({email, password}).populate('pets');

        if(!user){
           return response.status(404).send({reposne: false, message : 'faild to autenticate. email or password incorrect.'});
        }
        
        let userchanged = user.toJSON();
        delete userchanged.password;
        response.send(userchanged);
    }

    async changeUserParams(request : Request, response : Response){
        
        let user = await User.findOne({email: request.body.email});

        if(user != null){

            let userchanged = user.toJSON();
            userchanged.routes.push(request.body.id);
            userchanged.toursNumbers = userchanged.toursNumbers + 1;
            delete userchanged.password;

            const newUser = await User.findOneAndUpdate({email : request.body.email}, userchanged, {new : true}).populate('routes'); //.populate('routes')
            
            response.status(200).send(newUser);
        }else{
            
            response.status(400).send({response : false, message : "Fail to load user."})
        }

    }

    routes (){
        this.router.get('/getUsers', this.getUser);
        this.router.post('/createUser', this.createUser);
        this.router.post('/validateUser', this.validateUser);
        this.router.post('/changeUserParams',this.changeUserParams)
    }
}

const userRoutes = new UserRoutes();
userRoutes.routes();

export default userRoutes.router;