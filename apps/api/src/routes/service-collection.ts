import {
  CreateInstitutionService,
  FindInstitutionsService
} from '@kaizen/institution-server';
import { LoginService, RefreshTokenService } from '@kaizen/auth-server';
import { UserRepository, InstitutionRepository } from '@kaizen/data';
import { CreateUserValidator } from '@kaizen/user';
import { CreateUserService, CreateLinkTokenService } from '@kaizen/user-server';
import { GetUserService } from '@kaizen/user-server';
import { InstitutionController } from './institution/institution.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user';
import { FinancialProvider, plaidClient } from '@kaizen/provider';

// Repositories
export const userRepository = new UserRepository();
export const institutionRepository = new InstitutionRepository();

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
