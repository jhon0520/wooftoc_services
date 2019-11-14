import {Schema, model} from 'mongoose';

const PetSchema = new Schema({
    urlPhoto : {
        type : String
    },
    name : {
        type : String
    },
    size : {
        type : String
    },
    race : {
        type : String
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    }
});

export default model('Pet', PetSchema);