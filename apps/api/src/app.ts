import { AppBuilder } from './app-builder';
import { ServiceCollectionBuilder } from './service-collection.builder';

const serviceCollection = new ServiceCollectionBuilder().build();
const appBuilder = new AppBuilder().withServiceCollection(serviceCollection);

export const app = appBuilder.build();
