import { environment } from '@kaizen/env';
import { app } from './app';

app.listen(environment.API_PORT, () => {
  console.log(`Server listening on port ${environment.API_PORT}...`);
});
