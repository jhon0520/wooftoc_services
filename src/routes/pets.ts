import {Router, Request, Response} from 'express';

import Pet from '../models/pet_model'

class PetRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes;
    };

    async getRoutes(request : Request, response : Response){
        const pet = await Pet.find();
        response.json(pet);
    }

    async createPet(request : Request, response : Response){
        try{

        console.log(request.body);

        const newPet =  await new Pet();

        await newPet.save().catch((error)=>{
            return response.status(404).send({response: false, message : error.message});
        }).then(()=>{
            response.status(202).send(newPet);
        });

        //response.send({ok:true});
        
        }catch(error){
            console.log(error);
        }
    }

    routes (){
        this.router.get('/getPets', this.getRoutes);
        this.router.post('/createPet', this.createPet);
    }
}

const routeRoutes = new PetRoutes();
routeRoutes.routes();

export default routeRoutes.router;