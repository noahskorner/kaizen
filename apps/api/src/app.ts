import { buildApp } from './build-app';
import { ServiceCollectionBuilder } from './service-collection.builder';

const serviceCollection = new ServiceCollectionBuilder().build();

export const app = buildApp(serviceCollection);
