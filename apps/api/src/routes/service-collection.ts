import {
  CreateInstitutionService,
  FindInstitutionsService,
  FindTransactionsService
} from '@kaizen/institution-server';
import { LoginService, RefreshTokenService } from '@kaizen/auth-server';
import {
  UserRepository,
  InstitutionRepository,
  TransactionRepository
} from '@kaizen/data';
import { CreateUserValidator } from '@kaizen/user';
import { CreateUserService, CreateLinkTokenService } from '@kaizen/user-server';
import { GetUserService } from '@kaizen/user-server';
import { InstitutionController } from './institution/institution.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user';
import { FinancialProvider, plaidClient } from '@kaizen/provider';
import { TransactionController } from './transaction/transaction.controller';

// Repositories
export const userRepository = new UserRepository();
export const institutionRepository = new InstitutionRepository();
export const transactionRepository = new TransactionRepository();

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
  institutionRepository,
  financialProvider
);
export const findInstitutionsService = new FindInstitutionsService(
  institutionRepository
);
export const findTransactionsService = new FindTransactionsService(
  transactionRepository
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
