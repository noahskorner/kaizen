import path from 'path';
import dotnev from 'dotenv';
import { v4 as uuid } from 'uuid';
dotnev.config({ path: path.resolve(__dirname + '/../.env') });
import { createDatabaseSchema } from './create-database-schema/prompt';
import { createOutput } from './create-output';
import { createServiceImpl } from './create-service-impl/prompt';

const FEATURE_PROMPT = 'As a user, I want to create todos.';

// TODO: Make this work for a single feature for now,
// but we will need to make it work for multiple features
const nova = async () => {
  // Create a unique identifier for this run
  const requestId = uuid();

  // Create database schema
  const createDatabaseSchemaResponse =
    await createDatabaseSchema(FEATURE_PROMPT);
  const createServiceImpleResponse = await createServiceImpl(FEATURE_PROMPT);

  // Create the code files
  createOutput(requestId, [
    createDatabaseSchemaResponse,
    createServiceImpleResponse
  ]);
};

nova();
