import mongoose from 'mongoose';
import 'dotenv/config';

const MONGODB = process.env.MONGO_DB;

const connect = async () => {
    try {
        const DB = await mongoose.connect(MONGODB, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });
        const { name, host } = DB.connection;
        console.log(`Connected do database ${name} in host: ${host}`);
    } catch (error) {
        console.log('Error connecting to database', error);
    }
}

export { connect }