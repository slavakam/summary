import { MONGO_URI } from '../config';
import mongooseConnector from '../connectors/mongoose-connector';
import userSeeds from './user-seeds';
import summarySeeds from './summary-seeds';

initSeeds();

async function initSeeds() {
  const mongoConnection = await mongooseConnector(MONGO_URI);

  await mongoConnection.connection.dropDatabase();

  try {
    const users = await userSeeds();
    console.log(users);
    const summaries = await summarySeeds(users);
    console.log(summaries);
  } catch (error) {
    console.error(error);
  } finally {
    mongoConnection.connection.close();
  }
}
