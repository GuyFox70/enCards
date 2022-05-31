import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  word: {
    type: String,
    required: true,
  },
  transcription: {
    type: String,
    default: '',
  },
  translate: {
    type: Array,
    required: true
  },
  frequency: {
    type: String,
    default: ''
  },
  amount: {
    type: Object,
    default: {}
  }
});

schema.statics = {
  saveWord: async function(obj) {
    const { word } = obj;
    const Words = this;
    try{
      await new Words(obj).save();
      return `Word ${word} is save!`; 
    }
    catch(err) {
      throw new Error(err)
    }
  },
  getPartSpeech: async function(data) {
    let  { partSpeech, skip, limit } = data;

    if (partSpeech === undefined) return 400; //bad request
    if (limit === undefined) limit = 100;
    if (skip === undefined) skip = 0;

    const Words = this;
    return  await Words.find({[`translate.${ partSpeech }`]: { '$exists': true } }, null, { skip: skip, limit: limit, projection: { _id: 0, __v: 0 } }).lean();
  },
  getAmount: async function(partSpeech) {
    const Words = this;
    const arr = await Words.find({[`translate.${ partSpeech }`]: { '$exists': true } }, null, { projection: { _id: 0, __v: 0, translate: 0, example: 0 } }).lean();
    return arr.length;
  }
}

export default schema;