import connectMongoose from './connectDB.mjs';
import en from './models/en.mjs';
import Logger from '../utils/logger.mjs';

const logger = new Logger(import.meta.url);

async function initMongooseModels() {
  try {
    const mongoose = await connectMongoose();
    return {
      en: getModel(mongoose, 'en_words_v5', en),
    }
  } catch (error) {
    logger.log(error);
  }
}

function getModel(mongoose, nameModel, schema) {
  return mongoose.model(nameModel, schema);
}

export default initMongooseModels;