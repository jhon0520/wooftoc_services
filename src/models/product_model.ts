import {Schema, model} from 'mongoose';

const ProductSchema = new Schema({
    title : { 
        type : String
    },
    description : {
        type : String
    },
    icon : {
        type : String
    },
    urlImage : {
        type : String
    }
});

export default model('Product', ProductSchema);