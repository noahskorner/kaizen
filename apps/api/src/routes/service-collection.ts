import {
  CreateInstitutionRepository,
  CreateInstitutionService,
  FindInstitutionsRepository,
  FindInstitutionsService,
  FindTransactionsRepository,
  FindTransactionsService
} from '@kaizen/finance-server';
import { LoginService, RefreshTokenService } from '@kaizen/auth-server';
import { CreateUserValidator } from '@kaizen/user';
import {
  CreateUserService,
  CreateLinkTokenService,
  UserRepository
} from '@kaizen/user-server';
import { GetUserService } from '@kaizen/user-server';
import { InstitutionController } from './finance/institution/institution.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user';
import { FinancialProvider, plaidClient } from '@kaizen/provider';
import { TransactionController } from './finance/transaction/transaction.controller';

// Repositories
export const userRepository = new UserRepository();
export const createIntitutionRepository = new CreateInstitutionRepository();
export const findInstitutionsRepository = new FindInstitutionsRepository();
export const findTransactionsRepository = new FindTransactionsRepository();

// Validators
export const createUserValidator = new CreateUserValidator();

// Providers
export const financialProvider = new FinancialProvider(plaidClient);

// Services
export const getUserService = new GetUserService(userRepository);
export const createUserService = new CreateUserService(
  userRepository,
  getUserService,
  createUserValidator
);
export const createLinkTokenService = new CreateLinkTokenService(
  userRepository,
  financialProvider
);
export const loginService = new LoginService(userRepository);
export const refreshTokenService = new RefreshTokenService(getUserService);
export const createInstitutionService = new CreateInstitutionService(
  createIntitutionRepository,
  financialProvider
);
export const findInstitutionsService = new FindInstitutionsService(
  findInstitutionsRepository
);
export const findTransactionsService = new FindTransactionsService(
  findTransactionsRepository
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
