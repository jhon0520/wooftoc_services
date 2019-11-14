import moongose from 'mongoose';

async function connect(){
    try{
        await moongose.connect('', {
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