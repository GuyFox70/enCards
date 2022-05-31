import mongoose from 'mongoose';
import en from '../db/models/en.mjs';

try {
  mongoose.connect('mongodb://localhost:27017/words', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    minPoolSize: 20,
  });
  
  mongoose.connection.on('error', err => console.log(err.message));

  mongoose.connection.on('disconnected', () => console.log('diconnected!'));

  const model = mongoose.model('en_words_v5', en);

  model.find((err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('yes', result);
    }
    mongoose.connection.close();
  });

} catch (err) {
  console.log(err.message);
}