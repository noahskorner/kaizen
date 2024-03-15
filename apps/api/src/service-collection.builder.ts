import {
  CreateInstitutionRepository,
  CreateInstitutionService,
  FinancialProvider,
  FindAccountsRepository,
  FindInstitutionsRepository,
  FindInstitutionsService,
  FindTransactionsRepository,
  FindTransactionsService,
  GetAccountRepository,
  SyncAccountsRepository,
  SyncAccountsService,
  SyncInstitutionsService,
  SyncTransactionsRepository,
  SyncTransactionsService
} from '@kaizen/finance-server';
import { LoginService, RefreshTokenService } from '@kaizen/auth-server';
import {
  CreateUserService,
  CreateLinkTokenService,
  CreateUserRepository,
  FindUserByEmailRepository,
  GetUserRepository,
  GetUserService
} from '@kaizen/user-server';
import { AuthController } from './routes/auth/auth.controller';
import { UserController } from './routes/user/user.controller';
import { InstitutionController } from './routes/finance/institution/institution.controller';
import { TransactionController } from './routes/finance/transaction/transaction.controller';
import { IServerEnvironment, serverEnvironment } from '@kaizen/env-server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { IServiceCollection } from './service-collection.interface';
import { HomeController } from './routes/home.controller';
import { serviceEventBus as defaultServiceEventBus } from './events';
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';

export class ServiceCollectionBuilder {
  private _serviceCollection: Partial<IServiceCollection> = {};

  public withEnvironment(
    environment: IServerEnvironment
  ): ServiceCollectionBuilder {
    this._serviceCollection.environment = environment;
    return this;
  }

  public withPrisma(prisma: PrismaClient) {
    this._serviceCollection.prisma = prisma;
    return this;
  }

  public withPlaidApi(plaidApi: PlaidApi) {
    this._serviceCollection.plaid = plaidApi;
    return this;
  }

  public build(): IServiceCollection {
    // Environment
    const environment =
      this._serviceCollection.environment ?? serverEnvironment;

    // Service Events
    const serviceEventBus =
      this._serviceCollection.serviceEventBus ?? defaultServiceEventBus;

    // Plaid
    const plaid =
      this._serviceCollection.plaid ??
      new PlaidApi(
        new Configuration({
          basePath: PlaidEnvironments.sandbox,
          baseOptions: {
            headers: {
              'PLAID-CLIENT-ID': serverEnvironment.PLAID_CLIENT_ID,
              'PLAID-SECRET': serverEnvironment.PLAID_SECRET
            }
          }
        })
      );

    // Prisma
    const prisma = this._serviceCollection.prisma ?? new PrismaClient();

    // Repositories
    const createUserRepository =
      this._serviceCollection.createUserRepository ??
      new CreateUserRepository(prisma);
    const findUserByEmailRepository =
      this._serviceCollection.findUserByEmailRepository ??
      new FindUserByEmailRepository(prisma);
    const getUserRepository =
      this._serviceCollection.getUserRepository ??
      new GetUserRepository(prisma);
    const getAccountRepository =
      this._serviceCollection.getAccountRepository ??
      new GetAccountRepository(prisma);
    const createInstitutionRepository =
      this._serviceCollection.createInstitutionRepository ??
      new CreateInstitutionRepository(prisma);
    const findInstitutionsRepository =
      this._serviceCollection.findInstitutionsRepository ??
      new FindInstitutionsRepository(prisma);
    const findTransactionsRepository =
      this._serviceCollection.findTransactionsRepository ??
      new FindTransactionsRepository(prisma);
    const syncAccountsRepository = new SyncAccountsRepository(prisma);
    const syncTransactionsRepository = new SyncTransactionsRepository(prisma);
    const findAccountsRepository = new FindAccountsRepository(prisma);

    // Providers
    const financialProvider =
      this._serviceCollection.financialProvider ?? new FinancialProvider(plaid);

    // Services
    const getUserService =
      this._serviceCollection.getUserService ??
      new GetUserService(getUserRepository);
    const createUserService =
      this._serviceCollection.createUserService ??
      new CreateUserService(findUserByEmailRepository, createUserRepository);
    const createLinkTokenService =
      this._serviceCollection.createLinkTokenService ??
      new CreateLinkTokenService(getUserRepository, financialProvider);
    const loginService =
      this._serviceCollection.loginService ??
      new LoginService(environment, findUserByEmailRepository, serviceEventBus);
    const refreshTokenService =
      this._serviceCollection.refreshTokenService ??
      new RefreshTokenService(environment, getUserRepository);
    const syncTransactionsService = new SyncTransactionsService(
      findInstitutionsRepository,
      findAccountsRepository,
      financialProvider,
      syncTransactionsRepository
    );
    const syncAccountsService = new SyncAccountsService(
      financialProvider,
      findInstitutionsRepository,
      getAccountRepository,
      syncAccountsRepository,
      syncTransactionsService
    );
    const createInstitutionService =
      this._serviceCollection.createInstitutionService ??
      new CreateInstitutionService(
        createInstitutionRepository,
        financialProvider,
        syncAccountsService
      );
    const findInstitutionsService =
      this._serviceCollection.findInstitutionsService ??
      new FindInstitutionsService(findInstitutionsRepository);
    const findTransactionsService =
      this._serviceCollection.findTransactionsService ??
      new FindTransactionsService(findTransactionsRepository);
    const syncInstitutionsService =
      this._serviceCollection.syncInstitutionsService ??
      new SyncInstitutionsService(syncAccountsService);

    // Controllers
    const homeController =
      this._serviceCollection.homeController ?? new HomeController();
    const userController =
      this._serviceCollection.userController ??
      new UserController(createUserService, createLinkTokenService);
    const authController =
      this._serviceCollection.authController ??
      new AuthController(environment, loginService, refreshTokenService);
    const institutionController =
      this._serviceCollection.institutionController ??
      new InstitutionController(
        createInstitutionService,
        findInstitutionsService,
        syncInstitutionsService
      );
    const transactionController =
      this._serviceCollection.transactionController ??
      new TransactionController(findTransactionsService);

    const serviceCollection: IServiceCollection = {
      // Environment
      environment,
      // Events
      serviceEventBus,
      // Plaid
      plaid,
      // Prisma
      prisma,
      // Providers
      financialProvider,
      // Repositories
      createUserRepository,
      findUserByEmailRepository,
      getUserRepository,
      getAccountRepository,
      createInstitutionRepository,
      findInstitutionsRepository,
      findTransactionsRepository,
      // Services
      getUserService,
      createUserService,
      createLinkTokenService,
      loginService,
      refreshTokenService,
      syncAccountsService,
      createInstitutionService,
      findInstitutionsService,
      findTransactionsService,
      syncInstitutionsService,
      // Controllers
      homeController,
      userController,
      authController,
      institutionController,
      transactionController
    };

    return serviceCollection;
  }
}
