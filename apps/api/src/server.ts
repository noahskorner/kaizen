import { serverEnvironment } from '@kaizen/env-server';
import { app } from './app';

app.listen(serverEnvironment.API_PORT, () => {
  console.log(`Server listening on port ${serverEnvironment.API_PORT}...`);
});
