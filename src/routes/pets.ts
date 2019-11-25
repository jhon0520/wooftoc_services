import {Router, Request, Response} from 'express';

import User from '../models/user_model';
import Pet from '../models/pet_model'
import MailOptions from '../logic/mailOptions';

class PetRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes;
    };

    async getPets(request : Request, response : Response){
        const pet = await Pet.find();
        response.json(pet);
    }

    async createPet(request : Request, response : Response){
        try{

        const {email, urlPhoto, name, size, race, age, gender} = request.body;
        const newPet =  await new Pet({urlPhoto, name, size, race, age, gender});

        let pet = await newPet.save();

        if(pet){
            let user = await User.findOne({email});

            if(user != null){

                let userchanged = user.toJSON();
                userchanged.pets.push(pet._id);
                delete userchanged.password;

                console.log(userchanged);
    
                const newUser = await User.findOneAndUpdate({email}, userchanged, {new : true}).populate('pets');
                
                response.status(200).send(newUser);
            }else{
                
                response.status(400).send({response : false, message : "Fail to load user."})
            }
        }
        
        }catch(error){
            console.log(error);
            response.status(404).send({response: false, message : error.message});
        }
    }

    async createService (request : Request, response : Response){
        const mail = new MailOptions();

        const {tipo, direccion, hora, telefono} = request.body

        mail.sendMailServices(tipo, direccion, hora, telefono);

        response.status(200).send({response : true});

    }

    routes (){
        this.router.get('/getPets', this.getPets);
        this.router.post('/createPet', this.createPet);
        this.router.post('/createService', this.createService)
    }
}

const petRoutes = new PetRoutes();
petRoutes.routes();

export default petRoutes.router;