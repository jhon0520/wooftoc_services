import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    name : { 
        type : String
    },
    phone : {
        type : Number
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    pets : [{
        type : Schema.Types.ObjectId,
        ref : 'Pet',
    }],
});

export default model('User', UserSchema);