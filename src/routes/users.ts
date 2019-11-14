import {Router, Request, Response} from 'express';

import User from '../models/user_model'

class UserRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes;
    };

    async getUser(request : Request, response : Response){
        const users = await User.find().populate('routes');
        response.json(users);
    }

    async createUser(request : Request, response : Response){
        //console.log(request.body);
        console.log('/crearUsuario');
        console.log('request:');
        console.log('');
        console.log(request.body);
        console.log('');
        const {firstName, secondName, firstLastName, secondLastName, email, password,
            nickName, birthDay, weight, age, height} = request.body;

        const newUser =  await new User({firstName, secondName, firstLastName, secondLastName, email,
            password, nickName, birthDay, weight, age, height});

        await newUser.save().catch((error)=>{
            console.log('');
            console.log('error /createUser');
            console.log(error);
            console.log('');
            return response.status(404).send({response: false, message : error.message});
        }).then(()=>{
            console.log('');
            console.log('Response /newUser');
            let userchanged = newUser.toJSON();
            delete userchanged.password;
            console.log(userchanged);
            console.log('');
            return response.status(202).send(userchanged);
        });
    }

    async validateUser(request : Request, response : Response){

        const {email, password } = request.body;

        console.log(request.body);

        const user = await User.findOne({email, password}).populate('routes');
        //console.log(user);

        if(!user){
           return response.status(404).send({reposne: false, message : 'faild to autenticate. email or password incorrect.'});
        }
        
        let userchanged = user.toJSON();
        delete userchanged.password;
        console.log(userchanged);
        response.send(userchanged);
    }

    async changeUserParams(request : Request, response : Response){
        //console.log(request.body);

        console.log('/changeParams');
        console.log('request:');
        console.log('');
        console.log(request.body);
        console.log('');
        
        let user = await User.findOne({email: request.body.email});

        if(user != null){

            let userchanged = user.toJSON();
            userchanged.routes.push(request.body.id);
            userchanged.toursNumbers = userchanged.toursNumbers + 1;
            delete userchanged.password;
            //userchanged.routes = [];
            //console.log(userchanged.toursNumbers);
            //console.log(userchanged);
            const newUser = await User.findOneAndUpdate({email : request.body.email}, userchanged, {new : true}).populate('routes'); //.populate('routes')
            
            console.log('response: /changeParams');
            console.log('');
            console.log(newUser);
            console.log('');

            response.status(200).send(newUser);
        }else{

            console.log({error: true});
           console.log('');
            
            response.status(400).send({response : false, message : "Fail to load user."})
        }

        // const newUser = await User.findOneAndUpdate({email : request.body.email}, request.body, {new : true});
        //console.log('new user',user);
        //response.send({response : true});
        //response.json(user);
        
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