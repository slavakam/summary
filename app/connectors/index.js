import { MONGO_URI } from '../config';
import mongooseConnector from './mongoose-connector';

const connectorsInit = () => {
  mongooseConnector(MONGO_URI);
};

export {
  mongooseConnector,
};

export default connectorsInit;
