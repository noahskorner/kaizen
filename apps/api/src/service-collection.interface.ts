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
  IUpdateTransactionCategoryService,
  IFindAccountHistoryRepository,
  IFindAccountHistoryService,
  ICreateAccountHistoryService,
  ICreateAccountHistoryRepository,
  IDeleteAccountService,
  IGetExchangeRateService,
  IExchangeRateProvider,
  IUpdateTransactionRepository,
  IUpdateTransactionService,
  IDeleteTransactionCategoryRepository,
  ICreateTransactionCategoryRepository
} from '@kaizen/finance';
import {
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IGetUserRepository,
  IGetUserService,
  ICreateUserService,
  ICreateLinkTokenService,
  IUpdateEmailService,
  IUpdateEmailRepository,
  IVerifyUpdateEmailService,
  IUpdatePasswordRepository,
  IUpdatePasswordService,
  IForgotPasswordService
} from '@kaizen/user';
import { PlaidApi } from 'plaid';
import { HomeController } from './routes/home.controller';
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';
import { IEmailProvider, IServiceEventBus } from '@kaizen/core-server';
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
  CreateUserController,
  UpdateEmailController,
  VerifyUpdateEmailController,
  ForgotPasswordController,
  UpdatePasswordController
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
  DeleteAccountController,
  DeleteAccountRepository,
  FindAccountHistoryController,
  FindCategoriesController,
  FindInstitutionsController,
  FindTransactionsController,
  GetExchangeRateController,
  SyncInstitutionsController,
  UpdateTransactionCategoryController,
  UpdateTransactionController
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
  emailProvider: IEmailProvider;
  exchangeRateProvider: IExchangeRateProvider;

  // Repositories
  createUserRepository: ICreateUserRepository;
  findUserByEmailRepository: IFindUserByEmailRepository;
  getUserRepository: IGetUserRepository;
  getAccountRepository: IGetAccountRepository;
  createAccountHistoryRepository: ICreateAccountHistoryRepository;
  createInstitutionRepository: ICreateInstitutionRepository;
  findInstitutionsRepository: IFindInstitutionsRepository;
  findTransactionsRepository: IFindTransactionsRepository;
  getWalletRepository: IGetWalletRepository;
  createWalletRepository: ICreateWalletRepository;
  updateWalletRepository: IUpdateWalletRepository;
  findCategoriesRepository: IFindCategoriesRepository;
  createCategoryRepository: ICreateCategoryRepository;
  getCategoryRepository: IGetCategoryRepository;
  findAccountHistoryRepository: IFindAccountHistoryRepository;
  updateEmailRepository: IUpdateEmailRepository;
  updatePasswordRepository: IUpdatePasswordRepository;
  deleteAccountRepository: DeleteAccountRepository;
  updateTransactionRepository: IUpdateTransactionRepository;
  deleteTransactionCategoryRepository: IDeleteTransactionCategoryRepository;
  createTransactionCategoryRepository: ICreateTransactionCategoryRepository;

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
  updateEmailService: IUpdateEmailService;
  verifyUpdateEmailService: IVerifyUpdateEmailService;
  updatePasswordService: IUpdatePasswordService;
  forgotPasswordService: IForgotPasswordService;
  deleteAccountService: IDeleteAccountService;
  getExchangeRateService: IGetExchangeRateService;
  updateTransactionService: IUpdateTransactionService;

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
  updateEmailController: UpdateEmailController;
  verifyUpdateEmailController: VerifyUpdateEmailController;
  updatePasswordController: UpdatePasswordController;
  forgotPasswordController: ForgotPasswordController;
  deleteAccountController: DeleteAccountController;
  getExchangeRateController: GetExchangeRateController;
  updateTransactionController: UpdateTransactionController;
}
