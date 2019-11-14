import moongose from 'mongoose';

async function connect(){
    try{
        await moongose.connect('mongodb+srv://wooftoc:PEMqUYnqg6y2dVzl@cluster0-hrhfw.mongodb.net/test?retryWrites=true&w=majority', {
            useUnifiedTopology : true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex : true,
        });
        console.log('>>> Databse is connected.');
    }catch{
        console.log('Connected error to DataBase');
    }
};

export default connect;