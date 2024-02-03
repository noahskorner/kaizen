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
  IFindVirtualAccountsService,
  ISyncAccountsService,
  IGetAccountRepository,
  ISyncInstitutionsService
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
import { AuthController } from './routes/auth/auth.controller';
import {
  InstitutionController,
  TransactionController,
  VirtualAccountController
} from './routes/finance';
import { UserController } from './routes/user';
import { HomeController } from './routes/home.controller';
import { IServerEnvironment } from '@kaizen/env-server';
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';

export interface IServiceCollection {
  // Environment
  environment: IServerEnvironment;

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
  getAccountRepository: IGetAccountRepository;
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
  syncAccountsService: ISyncAccountsService;
  syncInstitutionsService: ISyncInstitutionsService;
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
