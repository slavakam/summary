import mongoose from 'mongoose';

mongoose.Promise = Promise;

export default (mongoUri) => {
  if (!mongoUri) {
    throw Error('Mongo uri is indefined');
  }

  return mongoose
    .connect(mongoUri, { useNewUrlParser: true })
    .then((mongodb) => {
      console.log('Mongo connected');

      return mongodb;
    });
};
