import { ILoginService, IRefreshTokenService } from '@kaizen/auth';
import {
  IFinancialProvider,
  ICreateInstitutionRepository,
  IFindInstitutionsRepository,
  IFindTransactionsRepository,
  ICreateInstitutionService,
  IFindInstitutionsService,
  IFindTransactionsService,
  ISyncAccountsService,
  IGetAccountRepository,
  ISyncInstitutionsService,
  ISnapshotAccountsService,
  ICreateAccountSnapshotRepository
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
import { InstitutionController, TransactionController } from './routes/finance';
import { UserController } from './routes/user';
import { HomeController } from './routes/home.controller';
import { IServerEnvironment } from '@kaizen/env-server';
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';
import { IServiceEventBus } from '@kaizen/core-server';
import {
  ICreateWalletRepository,
  ICreateWalletService,
  IGetWalletRepository,
  IGetWalletService,
  IUpdateWalletRepository,
  IUpdateWalletService
} from '@kaizen/wallet';
import { GetWalletController } from './routes/wallet';

export interface IServiceCollection {
  // Environment
  environment: IServerEnvironment;

  // Events
  serviceEventBus: IServiceEventBus;

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
  createAccountSnapshotRepository: ICreateAccountSnapshotRepository;
  createInstitutionRepository: ICreateInstitutionRepository;
  findInstitutionsRepository: IFindInstitutionsRepository;
  findTransactionsRepository: IFindTransactionsRepository;
  getWalletRepository: IGetWalletRepository;
  createWalletRepository: ICreateWalletRepository;
  updateWalletRepository: IUpdateWalletRepository;

  // Services
  getUserService: IGetUserService;
  createUserService: ICreateUserService;
  createLinkTokenService: ICreateLinkTokenService;
  loginService: ILoginService;
  refreshTokenService: IRefreshTokenService;
  syncAccountsService: ISyncAccountsService;
  snapshotAccountsService: ISnapshotAccountsService;
  syncInstitutionsService: ISyncInstitutionsService;
  createInstitutionService: ICreateInstitutionService;
  findInstitutionsService: IFindInstitutionsService;
  findTransactionsService: IFindTransactionsService;
  createWalletService: ICreateWalletService;
  updateWalletService: IUpdateWalletService;
  getWalletService: IGetWalletService;

  // Controllers
  homeController: HomeController;
  userController: UserController;
  authController: AuthController;
  institutionController: InstitutionController;
  transactionController: TransactionController;
  getWalletController: GetWalletController;
}
