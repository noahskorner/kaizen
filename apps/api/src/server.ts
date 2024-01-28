import { serverEnvironment } from '@kaizen/env-server';
import { app } from './build-app';

app.listen(parseInt(serverEnvironment.API_PORT), () => {
  console.log(`Server listening on port ${serverEnvironment.API_PORT}...`);
});
