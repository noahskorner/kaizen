import {
  CreateInstitutionRepository,
  CreateInstitutionService,
  CreateVirtualAccountRepository,
  CreateVirtualAccountService,
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
import { FinancialProvider, plaidClient } from '@kaizen/core-server';
import { InstitutionController } from './finance/institution/institution.controller';
import { TransactionController } from './finance/transaction/transaction.controller';
import { VirtualAccountController } from './finance';
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';

// Prisma
export const prisma = new PrismaClient();

// Repositories
export const createUserRepository = new CreateUserRepository(prisma);
export const findUserByEmailRepository = new FindUserByEmailRepository(prisma);
export const getUserRepository = new GetUserRepository(prisma);
export const createInstitutionRepository = new CreateInstitutionRepository(
  prisma
);
export const findInstitutionsRepository = new FindInstitutionsRepository(
  prisma
);
export const findTransactionsRepository = new FindTransactionsRepository(
  prisma
);
export const createVirtualAccountRepository =
  new CreateVirtualAccountRepository(prisma);
export const findVirtualAccountsRepository = new FindVirtualAccountsRepository(
  prisma
);

// Providers
export const financialProvider = new FinancialProvider(plaidClient);

// Services
export const getUserService = new GetUserService(getUserRepository);
export const createUserService = new CreateUserService(
  findUserByEmailRepository,
  createUserRepository
);
export const createLinkTokenService = new CreateLinkTokenService(
  getUserRepository,
  financialProvider
);
export const loginService = new LoginService(findUserByEmailRepository);
export const refreshTokenService = new RefreshTokenService(getUserRepository);
export const createInstitutionService = new CreateInstitutionService(
  createInstitutionRepository,
  financialProvider
);
export const findInstitutionsService = new FindInstitutionsService(
  findInstitutionsRepository
);
export const findTransactionsService = new FindTransactionsService(
  findTransactionsRepository
);
export const createVirtualAccountService = new CreateVirtualAccountService(
  createVirtualAccountRepository
);
export const findVirtualAccountsService = new FindVirtualAccountsService(
  findVirtualAccountsRepository
);

// Controllers
export const userController = new UserController(
  createUserService,
  createLinkTokenService
);
export const authController = new AuthController(
  loginService,
  refreshTokenService
);
export const institutionController = new InstitutionController(
  createInstitutionService,
  findInstitutionsService
);
export const transactionController = new TransactionController(
  findTransactionsService
);
export const virtualAccountController = new VirtualAccountController(
  createVirtualAccountService,
  findVirtualAccountsService
);
