import { environment } from './env/environment';
import { AppBuilder } from './app-builder';
import { ServiceCollectionBuilder } from './service-collection.builder';
import { createPrismaClient } from './create-prisma-client';

createPrismaClient().then((prisma) => {
  const serviceCollection = new ServiceCollectionBuilder()
    .withPrisma(prisma)
    .build();
  const appBuilder = new AppBuilder().withServiceCollection(serviceCollection);
  const app = appBuilder.build();

  app.listen(parseInt(environment.API_PORT), () => {
    console.log(`Server listening on port ${environment.API_PORT}...`);
  });
});
