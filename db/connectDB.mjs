import mongoose from 'mongoose';
import Logger from '../utils/logger.mjs';

const logger = new Logger(import.meta.url);

async function connectMongoose() {
  try {
    if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);
    await mongoose.connect('mongodb://localhost:27017/words', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      minPoolSize: 20,
    });
    return mongoose;
  } catch (error) {
    logger.log(err);
    throw error;
  }
}

export default connectMongoose;