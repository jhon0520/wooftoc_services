import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    name : { 
        type : String
    },
    phone : {
        type : Number
    },
    mail : {
        type : String
    },
    password : {
        type : String
    },
    routes : [{
        type : Schema.Types.ObjectId,
        ref : 'Pet',
    }],
});

export default model('User', UserSchema);