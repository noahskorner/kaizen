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
  FindVirtualAccountsService
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
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { InstitutionController } from './finance/institution/institution.controller';
import { TransactionController } from './finance/transaction/transaction.controller';
import { VirtualAccountController } from './finance';
import { serverEnvironment } from '@kaizen/env-server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { IServiceCollection } from './service-collection.interface';
import { HomeController } from './home.controller';
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';

export const createServiceCollection = (
  mocks: Partial<IServiceCollection> = {}
) => {
  // Environment
  const environment = mocks.environment ?? serverEnvironment;

  // Plaid
  const plaid =
    mocks.plaid ??
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
  const prisma = mocks.prisma ?? new PrismaClient();

  // Repositories
  const createUserRepository =
    mocks.createUserRepository ?? new CreateUserRepository(prisma);
  const findUserByEmailRepository =
    mocks.findUserByEmailRepository ?? new FindUserByEmailRepository(prisma);
  const getUserRepository =
    mocks.getUserRepository ?? new GetUserRepository(prisma);
  const createInstitutionRepository =
    mocks.createInstitutionRepository ??
    new CreateInstitutionRepository(prisma);
  const findInstitutionsRepository =
    mocks.findInstitutionsRepository ?? new FindInstitutionsRepository(prisma);
  const findTransactionsRepository =
    mocks.findTransactionsRepository ?? new FindTransactionsRepository(prisma);
  const createVirtualAccountRepository =
    mocks.createVirtualAccountRepository ??
    new CreateVirtualAccountRepository(prisma);
  const findVirtualAccountsRepository =
    mocks.findVirtualAccountsRepository ??
    new FindVirtualAccountsRepository(prisma);

  // Providers
  const financialProvider =
    mocks.financialProvider ?? new FinancialProvider(plaid);

  // Services
  const getUserService =
    mocks.getUserService ?? new GetUserService(getUserRepository);
  const createUserService =
    mocks.createUserService ??
    new CreateUserService(findUserByEmailRepository, createUserRepository);
  const createLinkTokenService =
    mocks.createLinkTokenService ??
    new CreateLinkTokenService(getUserRepository, financialProvider);
  const loginService =
    mocks.loginService ??
    new LoginService(environment, findUserByEmailRepository);
  const refreshTokenService =
    mocks.refreshTokenService ??
    new RefreshTokenService(environment, getUserRepository);
  const createInstitutionService =
    mocks.createInstitutionService ??
    new CreateInstitutionService(
      createInstitutionRepository,
      financialProvider
    );
  const findInstitutionsService =
    mocks.findInstitutionsService ??
    new FindInstitutionsService(findInstitutionsRepository);
  const findTransactionsService =
    mocks.findTransactionsService ??
    new FindTransactionsService(findTransactionsRepository);
  const createVirtualAccountService =
    mocks.createVirtualAccountService ??
    new CreateVirtualAccountService(createVirtualAccountRepository);
  const findVirtualAccountsService =
    mocks.findVirtualAccountsService ??
    new FindVirtualAccountsService(findVirtualAccountsRepository);

  // Controllers
  const homeController = mocks.homeController ?? new HomeController();
  const userController =
    mocks.userController ??
    new UserController(createUserService, createLinkTokenService);
  const authController =
    mocks.authController ??
    new AuthController(environment, loginService, refreshTokenService);
  const institutionController =
    mocks.institutionController ??
    new InstitutionController(
      createInstitutionService,
      findInstitutionsService
    );
  const transactionController =
    mocks.transactionController ??
    new TransactionController(findTransactionsService);
  const virtualAccountController =
    mocks.virtualAccountController ??
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
};
