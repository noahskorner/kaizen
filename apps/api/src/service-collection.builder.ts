import {
  CreateInstitutionRepository,
  CreateInstitutionService,
  CreateVirtualAccountRepository,
  CreateVirtualAccountService,
  FinancialProvider,
  FindInstitutionsRepository,
  FindInstitutionsService,
  FindTransactionsRepository,
  FindTransactionsService,
  FindVirtualAccountsRepository,
  FindVirtualAccountsService,
  GetAccountRepository,
  SyncAccountsRepository,
  SyncAccountsService
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
import { VirtualAccountController } from './routes/finance';
import { IServerEnvironment, serverEnvironment } from '@kaizen/env-server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { IServiceCollection } from './service-collection.interface';
import { HomeController } from './routes/home.controller';
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

  public withPlaidApi(plaidApi: PlaidApi) {
    this._serviceCollection.plaid = plaidApi;
    return this;
  }

  public build(): IServiceCollection {
    // Environment
    const environment =
      this._serviceCollection.environment ?? serverEnvironment;

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
    const createVirtualAccountRepository =
      this._serviceCollection.createVirtualAccountRepository ??
      new CreateVirtualAccountRepository(prisma);
    const findVirtualAccountsRepository =
      this._serviceCollection.findVirtualAccountsRepository ??
      new FindVirtualAccountsRepository(prisma);
    const syncAccountsRepository = new SyncAccountsRepository(prisma);

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
      new LoginService(environment, findUserByEmailRepository);
    const refreshTokenService =
      this._serviceCollection.refreshTokenService ??
      new RefreshTokenService(environment, getUserRepository);
    const syncAccountsService = new SyncAccountsService(
      financialProvider,
      findInstitutionsRepository,
      getAccountRepository,
      syncAccountsRepository
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
    const createVirtualAccountService =
      this._serviceCollection.createVirtualAccountService ??
      new CreateVirtualAccountService(createVirtualAccountRepository);
    const findVirtualAccountsService =
      this._serviceCollection.findVirtualAccountsService ??
      new FindVirtualAccountsService(findVirtualAccountsRepository);

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
        findInstitutionsService
      );
    const transactionController =
      this._serviceCollection.transactionController ??
      new TransactionController(findTransactionsService);
    const virtualAccountController =
      this._serviceCollection.virtualAccountController ??
      new VirtualAccountController(
        createVirtualAccountService,
        findVirtualAccountsService
      );

    const serviceCollection: IServiceCollection = {
      // Environment
      environment,
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
      createVirtualAccountRepository,
      findVirtualAccountsRepository,
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
      createVirtualAccountService,
      findVirtualAccountsService,
      // Controllers
      homeController,
      userController,
      authController,
      institutionController,
      transactionController,
      virtualAccountController
    };

    return serviceCollection;
  }
}
