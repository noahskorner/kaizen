import { app } from './app';
import { environment } from './env/environment';

app.listen(parseInt(environment.API_PORT), () => {
  console.log(`Server listening on port ${environment.API_PORT}...`);
});
