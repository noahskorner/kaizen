import {
  CreateInstitutionService,
  CreateVirtualAccountService,
  FindInstitutionsService,
  FindTransactionsService,
  FindVirtualAccountsService
} from '@kaizen/finance-server';
import { LoginService, RefreshTokenService } from '@kaizen/auth-server';
import {
  CreateInstitutionRepository,
  CreateUserRepository,
  FindTransactionsRepository,
  FindUserByEmailRepository,
  GetUserRepository,
  FindInstitutionsRepository,
  CreateVirtualAccountRepository,
  FindVirtualAccountsRepository
} from '@kaizen/core-server';
import { CreateUserService, CreateLinkTokenService } from '@kaizen/user-server';
import { GetUserService } from '@kaizen/user-server';
import { InstitutionController } from './finance/institution/institution.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user';
import { FinancialProvider, plaidClient } from '@kaizen/core-server';
import { TransactionController } from './finance/transaction/transaction.controller';
import { VirtualAccountController } from './finance';

// Repositories
export const createUserRepository = new CreateUserRepository();
export const findUserByEmailRepository = new FindUserByEmailRepository();
export const getUserRepository = new GetUserRepository();
export const createInstitutionRepository = new CreateInstitutionRepository();
export const findInstitutionsRepository = new FindInstitutionsRepository();
export const findTransactionsRepository = new FindTransactionsRepository();
export const createVirtualAccountRepository =
  new CreateVirtualAccountRepository();
export const findVirtualAccountsRepository =
  new FindVirtualAccountsRepository();

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
