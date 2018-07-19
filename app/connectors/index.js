import { MONGO_URI } from '../config';
import mongooseConnector from './mongoose-connector';
import server from '../server';

const connectorsInit = async () => {
  try {
    await mongooseConnector(MONGO_URI);
  } catch (error) {
    server.close();
    console.log(error);
  }
};

export {
  mongooseConnector,
};

export default connectorsInit;
