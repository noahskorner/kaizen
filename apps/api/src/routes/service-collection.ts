import { CreateAccountService } from '@kaizen/account-server';
import { LoginService, RefreshTokenService } from '@kaizen/auth-server';
import { UserRepository, AccountRepository } from '@kaizen/data';
import { CreateUserValidator } from '@kaizen/user';
import { CreateUserService, CreateLinkTokenService } from '@kaizen/user-server';
import { GetUserService } from '@kaizen/user-server/src/get-user-service';
import { AccountController } from './account/account.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user';

// Repositories
export const userRepository = new UserRepository();
export const accountRepository = new AccountRepository();

// Validators
export const createUserValidator = new CreateUserValidator();

// Services
export const getUserService = new GetUserService(userRepository);
export const createUserService = new CreateUserService(
  userRepository,
  getUserService,
  createUserValidator
);
export const createLinkTokenService = new CreateLinkTokenService(
  userRepository
);
export const loginService = new LoginService(userRepository);
export const refreshTokenService = new RefreshTokenService(getUserService);
export const createAccountService = new CreateAccountService(accountRepository);

// Controllers
export const userController = new UserController(
  createUserService,
  createLinkTokenService
);
export const authController = new AuthController(
  loginService,
  refreshTokenService
);
export const accountController = new AccountController(createAccountService);
