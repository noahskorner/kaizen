import { ILoginService, IRefreshTokenService } from '@kaizen/auth';
import {
  IFinancialProvider,
  ICreateInstitutionRepository,
  IFindInstitutionsRepository,
  IFindTransactionsRepository,
  ICreateVirtualAccountRepository,
  IFindVirtualAccountsRepository,
  ICreateInstitutionService,
  IFindInstitutionsService,
  IFindTransactionsService,
  ICreateVirtualAccountService,
  IFindVirtualAccountsService
} from '@kaizen/finance';
import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IGetUserRepository,
  IGetUserService,
  ICreateUserService,
  ICreateLinkTokenService
} from '@kaizen/user';
import { PlaidApi } from 'plaid';
import { AuthController } from './auth/auth.controller';
import {
  InstitutionController,
  TransactionController,
  VirtualAccountController
} from './finance';
import { UserController } from './user';
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';
import { HomeController } from './home.controller';

export interface IServiceCollection {
  // Plaid
  plaid: PlaidApi;
  // Prisma
  prisma: PrismaClient;
  // Providers
  financialProvider: IFinancialProvider;
  // Repositories
  createUserRepository: ICreateUserRepository;
  findUserByEmailRepository: IFindUserByEmailRepository;
  getUserRepository: IGetUserRepository;
  createInstitutionRepository: ICreateInstitutionRepository;
  findInstitutionsRepository: IFindInstitutionsRepository;
  findTransactionsRepository: IFindTransactionsRepository;
  createVirtualAccountRepository: ICreateVirtualAccountRepository;
  findVirtualAccountsRepository: IFindVirtualAccountsRepository;
  // Services
  getUserService: IGetUserService;
  createUserService: ICreateUserService;
  createLinkTokenService: ICreateLinkTokenService;
  loginService: ILoginService;
  refreshTokenService: IRefreshTokenService;
  createInstitutionService: ICreateInstitutionService;
  findInstitutionsService: IFindInstitutionsService;
  findTransactionsService: IFindTransactionsService;
  createVirtualAccountService: ICreateVirtualAccountService;
  findVirtualAccountsService: IFindVirtualAccountsService;
  // Controllers
  homeController: HomeController;
  userController: UserController;
  authController: AuthController;
  institutionController: InstitutionController;
  transactionController: TransactionController;
  virtualAccountController: VirtualAccountController;
}
