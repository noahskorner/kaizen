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
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';

// Plaid
const plaid =
  serverEnvironment.NODE_ENV === 'TEST'
    ? // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('../fixtures/mock-plaid-client').mockPlaidApi
    : new PlaidApi(
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
const prisma = new PrismaClient();

// Repositories
const createUserRepository = new CreateUserRepository(prisma);
const findUserByEmailRepository = new FindUserByEmailRepository(prisma);
const getUserRepository = new GetUserRepository(prisma);
const createInstitutionRepository = new CreateInstitutionRepository(prisma);
const findInstitutionsRepository = new FindInstitutionsRepository(prisma);
const findTransactionsRepository = new FindTransactionsRepository(prisma);
const createVirtualAccountRepository = new CreateVirtualAccountRepository(
  prisma
);
const findVirtualAccountsRepository = new FindVirtualAccountsRepository(prisma);

// Providers
const financialProvider = new FinancialProvider(plaid);

// Services
const getUserService = new GetUserService(getUserRepository);
const createUserService = new CreateUserService(
  findUserByEmailRepository,
  createUserRepository
);
const createLinkTokenService = new CreateLinkTokenService(
  getUserRepository,
  financialProvider
);
const loginService = new LoginService(findUserByEmailRepository);
const refreshTokenService = new RefreshTokenService(getUserRepository);
const createInstitutionService = new CreateInstitutionService(
  createInstitutionRepository,
  financialProvider
);
const findInstitutionsService = new FindInstitutionsService(
  findInstitutionsRepository
);
const findTransactionsService = new FindTransactionsService(
  findTransactionsRepository
);
const createVirtualAccountService = new CreateVirtualAccountService(
  createVirtualAccountRepository
);
const findVirtualAccountsService = new FindVirtualAccountsService(
  findVirtualAccountsRepository
);

// Controllers
const userController = new UserController(
  createUserService,
  createLinkTokenService
);
const authController = new AuthController(loginService, refreshTokenService);
const institutionController = new InstitutionController(
  createInstitutionService,
  findInstitutionsService
);
const transactionController = new TransactionController(
  findTransactionsService
);
const virtualAccountController = new VirtualAccountController(
  createVirtualAccountService,
  findVirtualAccountsService
);

export const ServiceCollection: IServiceCollection = {
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
  userController,
  authController,
  institutionController,
  transactionController,
  virtualAccountController
};
