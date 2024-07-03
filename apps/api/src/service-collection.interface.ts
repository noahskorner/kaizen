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
  IFindCategoriesRepository,
  IFindCategoriesService,
  ICreateCategoryRepository,
  ICreateCategoryService,
  IGetCategoryRepository,
  IUpdateTransactionCategoryRepository,
  IUpdateTransactionCategoryService,
  IFindAccountHistoryRepository,
  IFindAccountHistoryService,
  ICreateAccountHistoryService,
  ICreateAccountHistoryRepository
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
  CreateCategoryController,
  CreateInstitutionController,
  FindAccountHistoryController,
  FindCategoriesController,
  FindInstitutionsController,
  FindTransactionsController,
  SyncInstitutionsController,
  UpdateTransactionCategoryController
} from '@kaizen/finance-server';
import { Environment } from './env';
import { ITranscriptionProvider } from '@kaizen/assist-server';

export interface IServiceCollection {
  // Environment
  environment: Environment;

  // Events
  serviceEventBus: IServiceEventBus;

  // Plaid
  plaid: PlaidApi;

  // Prisma
  prisma: PrismaClient;

  // Providers
  financialProvider: IFinancialProvider;
  transcriptionProvider: ITranscriptionProvider;

  // Repositories
  createUserRepository: ICreateUserRepository;
  findUserByEmailRepository: IFindUserByEmailRepository;
  getUserRepository: IGetUserRepository;
  getAccountRepository: IGetAccountRepository;
  createAccountHistoryRepository: ICreateAccountHistoryRepository;
  createInstitutionRepository: ICreateInstitutionRepository;
  findInstitutionsRepository: IFindInstitutionsRepository;
  findTransactionsRepository: IFindTransactionsRepository;
  updateTransactionCategoryRepository: IUpdateTransactionCategoryRepository;
  getWalletRepository: IGetWalletRepository;
  createWalletRepository: ICreateWalletRepository;
  updateWalletRepository: IUpdateWalletRepository;
  findCategoriesRepository: IFindCategoriesRepository;
  createCategoryRepository: ICreateCategoryRepository;
  getCategoryRepository: IGetCategoryRepository;
  findAccountHistoryRepository: IFindAccountHistoryRepository;

  // Services
  getUserService: IGetUserService;
  createUserService: ICreateUserService;
  createLinkTokenService: ICreateLinkTokenService;
  loginService: ILoginService;
  refreshTokenService: IRefreshTokenService;
  syncAccountsService: ISyncAccountsService;
  createAccountHistoryService: ICreateAccountHistoryService;
  syncInstitutionsService: ISyncInstitutionsService;
  createInstitutionService: ICreateInstitutionService;
  findInstitutionsService: IFindInstitutionsService;
  findTransactionsService: IFindTransactionsService;
  updateTransactionCategoryService: IUpdateTransactionCategoryService;
  createWalletService: ICreateWalletService;
  updateWalletService: IUpdateWalletService;
  getWalletService: IGetWalletService;
  findCategoriesService: IFindCategoriesService;
  createCategoryService: ICreateCategoryService;
  findAccountHistoryService: IFindAccountHistoryService;

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
  updateTransactionCategoryController: UpdateTransactionCategoryController;
  getWalletController: GetWalletController;
  findCategoriesController: FindCategoriesController;
  createCategoryController: CreateCategoryController;
  findAccountHistoryController: FindAccountHistoryController;
}
