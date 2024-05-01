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
  ICreateAccountSnapshotRepository,
  IFindExpensesService,
  IFindExpensesRepository
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
import {
  CreateLinkTokenController,
  CreateUserController
} from '@kaizen/user-server';
import {
  LoginController,
  LogoutController,
  RefreshTokenController
} from '@kaizen/auth-server';
import { GetWalletController } from '@kaizen/wallet-server';
import {
  CreateInstitutionController,
  FindExpensesController,
  FindInstitutionsController,
  FindTransactionsController,
  SyncInstitutionsController
} from '@kaizen/finance-server';

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
  findExpensesRepository: IFindExpensesRepository;
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
  findExpensesService: IFindExpensesService;
  createWalletService: ICreateWalletService;
  updateWalletService: IUpdateWalletService;
  getWalletService: IGetWalletService;

  // Controllers
  homeController: HomeController;
  createUserController: CreateUserController;
  createLinkTokenController: CreateLinkTokenController;
  loginController: LoginController;
  refreshTokenController: RefreshTokenController;
  logoutController: LogoutController;
  createInstitutionController: CreateInstitutionController;
  findInstitutionsController: FindInstitutionsController;
  syncInstitutionsController: SyncInstitutionsController;
  findTransactionsController: FindTransactionsController;
  getWalletController: GetWalletController;
  findExpensesController: FindExpensesController;
}
