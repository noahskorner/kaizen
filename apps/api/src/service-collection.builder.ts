import {
  CreateCategoryController,
  CreateCategoryRepository,
  CreateCategoryService,
  CreateInstitutionController,
  CreateInstitutionRepository,
  CreateInstitutionService,
  PlaidFinancialProvider,
  FindAccountsRepository,
  FindCategoriesController,
  FindCategoriesRepository,
  FindCategoriesService,
  FindInstitutionsController,
  FindInstitutionsRepository,
  FindInstitutionsService,
  FindTransactionsController,
  FindTransactionsRepository,
  FindTransactionsService,
  GetAccountRepository,
  GetCategoryRepository,
  GetTransactionRepository,
  SyncAccountsRepository,
  SyncAccountsService,
  SyncInstitutionsController,
  SyncInstitutionsService,
  SyncTransactionsRepository,
  SyncTransactionsService,
  UpdateTransactionCategoryController,
  UpdateTransactionCategoryService,
  FindAccountHistoryRepository,
  FindAccountHistoryService,
  FindAccountHistoryController,
  CreateAccountHistoryRepository,
  CreateAccountHistoryService,
  DeleteAccountRepository,
  DeleteAccountService,
  DeleteAccountController,
  OpenExchangeRateProvider,
  GetExchangeRateService,
  GetExchangeRateController,
  GetExchangeRateRepository,
  SyncExchangeRateRepository,
  UpdateTransactionRepository,
  UpdateTransactionService,
  UpdateTransactionController,
  CreateTransactionCategoryRepository,
  DeleteTransactionCategoryRepository
} from '@kaizen/finance-server';
import {
  LoginController,
  LoginService,
  LogoutController,
  RefreshTokenController,
  RefreshTokenService,
  authenticate
} from '@kaizen/auth-server';
import {
  CreateUserService,
  CreateLinkTokenService,
  CreateUserRepository,
  FindUserByEmailRepository,
  GetUserRepository,
  GetUserService,
  CreateUserController,
  CreateLinkTokenController,
  VerifyUpdateEmailService,
  VerifyUpdateEmailController,
  UpdateEmailRepository,
  UpdateEmailService,
  UpdateEmailController,
  UpdatePasswordRepository,
  UpdatePasswordService,
  UpdatePasswordController,
  ForgotPasswordController,
  ForgotPasswordService
} from '@kaizen/user-server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { IServiceCollection } from './service-collection.interface';
import { HomeController } from './routes/home.controller';
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';
import {
  CreateUserSuccessEvent,
  IEmailProvider,
  IServiceEventBus,
  LocalEmailProvider,
  LoginSuccessEvent,
  ServiceEventBusBuilder,
  ServiceEventType,
  SyncAccountsSuccessEvent
} from '@kaizen/core-server';
import {
  CreateWalletRepository,
  CreateWalletService,
  GetWalletController,
  GetWalletRepository,
  GetWalletService,
  UpdateWalletRepository,
  UpdateWalletService
} from '@kaizen/wallet-server';
import { UpdateWalletCommand } from '@kaizen/wallet';
import { v4 as uuid } from 'uuid';
import { OpenAITranscriptionProvider } from '@kaizen/assist-server';
import { Environment, environment } from './env';
import {
  CreateAccountHistoryCommand,
  IExchangeRateProvider
} from '@kaizen/finance';

export class ServiceCollectionBuilder {
  private _serviceCollection: Partial<IServiceCollection> = {};

  public withEnvironment(environment: Environment): ServiceCollectionBuilder {
    this._serviceCollection.environment = environment;
    return this;
  }

  public withPrisma(prisma: PrismaClient) {
    this._serviceCollection.prisma = prisma;
    return this;
  }

  public withPlaidApi(plaidApi: PlaidApi) {
    this._serviceCollection.plaid = plaidApi;
    return this;
  }

  public withEventBus(serviceEventBus: IServiceEventBus) {
    this._serviceCollection.serviceEventBus = serviceEventBus;
    return this;
  }

  public withEmailProvider(emailProvider: IEmailProvider) {
    this._serviceCollection.emailProvider = emailProvider;
    return this;
  }

  public withExchangeRateProvider(exchangeRateProvider: IExchangeRateProvider) {
    this._serviceCollection.exchangeRateProvider = exchangeRateProvider;
    return this;
  }

  public build(): IServiceCollection {
    // Environment
    const serverEnvironment =
      this._serviceCollection.environment ?? environment;

    // Middleware
    const authMiddleware = authenticate(serverEnvironment.ACCESS_TOKEN_SECRET);

    // Events
    const serviceEventBus =
      this._serviceCollection.serviceEventBus ??
      new ServiceEventBusBuilder()
        // When a user is created, create a wallet for them
        .withHandler(
          ServiceEventType.CREATE_USER_SUCCESS,
          async (event: CreateUserSuccessEvent) => {
            await serviceCollection.createWalletService.create(event.payload);
          }
        )
        // When the user syncs their accounts, snapshot them
        .withHandler(
          ServiceEventType.SYNC_ACCOUNTS_SUCCESS,
          async (event: SyncAccountsSuccessEvent) => {
            const command: CreateAccountHistoryCommand = {
              userId: event.payload.userId
            };
            await serviceCollection.createAccountHistoryService.create(command);
          }
        )
        // When a user logs in, give them 10 coins
        .withHandler(
          ServiceEventType.LOGIN_SUCCESS,
          async (event: LoginSuccessEvent) => {
            const command: UpdateWalletCommand = {
              userId: event.payload.userId,
              transactionId: uuid(),
              amount: 10
            };
            await serviceCollection.updateWalletService.update(command);
          }
        )
        .build();

    // Plaid
    const plaid =
      this._serviceCollection.plaid ??
      new PlaidApi(
        new Configuration({
          basePath: PlaidEnvironments.sandbox,
          baseOptions: {
            headers: {
              'PLAID-CLIENT-ID': serverEnvironment.PLAID_CLIENT_ID,
              'PLAID-SECRET': serverEnvironment.PLAID_SECRET
            }
          }
        })
      );

    // Prisma
    const prisma = this._serviceCollection.prisma ?? new PrismaClient();

    const exchangeRateProvider =
      this._serviceCollection.exchangeRateProvider ??
      new OpenExchangeRateProvider(environment.OPEN_EXCHANGE_RATE_APP_ID);

    // Repositories
    const createUserRepository =
      this._serviceCollection.createUserRepository ??
      new CreateUserRepository(prisma);
    const findUserByEmailRepository =
      this._serviceCollection.findUserByEmailRepository ??
      new FindUserByEmailRepository(prisma);
    const getUserRepository =
      this._serviceCollection.getUserRepository ??
      new GetUserRepository(prisma);
    const getAccountRepository =
      this._serviceCollection.getAccountRepository ??
      new GetAccountRepository(prisma);
    const createAccountHistoryRepository = new CreateAccountHistoryRepository(
      prisma
    );
    const createInstitutionRepository =
      this._serviceCollection.createInstitutionRepository ??
      new CreateInstitutionRepository(prisma);
    const findInstitutionsRepository =
      this._serviceCollection.findInstitutionsRepository ??
      new FindInstitutionsRepository(prisma);
    const findTransactionsRepository =
      this._serviceCollection.findTransactionsRepository ??
      new FindTransactionsRepository(prisma);
    const syncAccountsRepository = new SyncAccountsRepository(prisma);
    const syncTransactionsRepository = new SyncTransactionsRepository(prisma);
    const findAccountsRepository = new FindAccountsRepository(prisma);
    const getWalletRepository = new GetWalletRepository(prisma);
    const createWalletRepository = new CreateWalletRepository(prisma);
    const updateWalletRepository = new UpdateWalletRepository(prisma);
    const getTransactionRepository = new GetTransactionRepository(prisma);
    const findCategoriesRepository = new FindCategoriesRepository(prisma);
    const createCategoryRepository = new CreateCategoryRepository(prisma);
    const getCategoryRepository = new GetCategoryRepository(prisma);
    const findAccountHistoryRepository = new FindAccountHistoryRepository(
      prisma
    );
    const updateEmailRepository = new UpdateEmailRepository(prisma);
    const updatePasswordRepository = new UpdatePasswordRepository(prisma);
    const deleteAccountRepository = new DeleteAccountRepository(prisma);
    const getExchangeRateRepository = new GetExchangeRateRepository(prisma);
    const syncExchangeRateRepository = new SyncExchangeRateRepository(prisma);
    const updateTransactionRepository = new UpdateTransactionRepository(prisma);
    const createTransactionCategoryRepository =
      new CreateTransactionCategoryRepository(prisma);
    const deleteTransactionCategoryRepository =
      new DeleteTransactionCategoryRepository(prisma);

    // Providers
    const financialProvider =
      this._serviceCollection.financialProvider ??
      new PlaidFinancialProvider(plaid);
    const transcriptionProvider =
      this._serviceCollection.transcriptionProvider ??
      new OpenAITranscriptionProvider(environment.OPENAI_API_KEY);
    const emailProvider =
      this._serviceCollection.emailProvider ?? new LocalEmailProvider();

    // Services
    const getUserService =
      this._serviceCollection.getUserService ??
      new GetUserService(getUserRepository);
    const createUserService =
      this._serviceCollection.createUserService ??
      new CreateUserService(
        findUserByEmailRepository,
        createUserRepository,
        serviceEventBus
      );
    const createLinkTokenService =
      this._serviceCollection.createLinkTokenService ??
      new CreateLinkTokenService(getUserRepository, financialProvider);
    const loginService =
      this._serviceCollection.loginService ??
      new LoginService(
        serverEnvironment.ACCESS_TOKEN_SECRET,
        serverEnvironment.ACCESS_TOKEN_EXPIRATION,
        serverEnvironment.REFRESH_TOKEN_SECRET,
        serverEnvironment.REFRESH_TOKEN_EXPIRATION,
        findUserByEmailRepository,
        serviceEventBus
      );
    const refreshTokenService =
      this._serviceCollection.refreshTokenService ??
      new RefreshTokenService(
        serverEnvironment.ACCESS_TOKEN_SECRET,
        serverEnvironment.ACCESS_TOKEN_EXPIRATION,
        serverEnvironment.REFRESH_TOKEN_SECRET,
        serverEnvironment.REFRESH_TOKEN_EXPIRATION,
        getUserRepository
      );
    const syncTransactionsService = new SyncTransactionsService(
      findInstitutionsRepository,
      findAccountsRepository,
      financialProvider,
      syncTransactionsRepository,
      getTransactionRepository
    );
    const syncAccountsService = new SyncAccountsService(
      financialProvider,
      findInstitutionsRepository,
      getAccountRepository,
      syncAccountsRepository,
      syncTransactionsService
    );
    const createAccountHistoryService = new CreateAccountHistoryService(
      findAccountsRepository,
      createAccountHistoryRepository
    );
    const createInstitutionService =
      this._serviceCollection.createInstitutionService ??
      new CreateInstitutionService(
        createInstitutionRepository,
        financialProvider,
        syncAccountsService
      );
    const findInstitutionsService =
      this._serviceCollection.findInstitutionsService ??
      new FindInstitutionsService(findInstitutionsRepository);
    const findTransactionsService =
      this._serviceCollection.findTransactionsService ??
      new FindTransactionsService(findTransactionsRepository);
    const updateTransactionCategoryService =
      this._serviceCollection.updateTransactionCategoryService ??
      new UpdateTransactionCategoryService(
        getTransactionRepository,
        getCategoryRepository,
        deleteTransactionCategoryRepository,
        createTransactionCategoryRepository
      );
    const syncInstitutionsService =
      this._serviceCollection.syncInstitutionsService ??
      new SyncInstitutionsService(syncAccountsService, serviceEventBus);
    const createWalletService = new CreateWalletService(
      getWalletRepository,
      createWalletRepository
    );
    const updateWalletService = new UpdateWalletService(
      getWalletRepository,
      updateWalletRepository
    );
    const getWalletService = new GetWalletService(getWalletRepository);
    const findCategoriesService = new FindCategoriesService(
      findCategoriesRepository
    );
    const createCategoryService = new CreateCategoryService(
      getCategoryRepository,
      createCategoryRepository
    );
    const findAccountHistoryService = new FindAccountHistoryService(
      findAccountHistoryRepository
    );
    const updateEmailService = new UpdateEmailService(
      environment.FRONTEND_DOMAIN,
      environment.UPDATE_EMAIL_SECRET,
      environment.UPDATE_EMAIL_EXPIRATION,
      findUserByEmailRepository,
      emailProvider
    );
    const verifyUpdateEmailService = new VerifyUpdateEmailService(
      environment.UPDATE_EMAIL_SECRET,
      updateEmailRepository
    );
    const updatePasswordService = new UpdatePasswordService(
      updatePasswordRepository
    );
    const forgotPasswordService = new ForgotPasswordService(
      environment.FORGOT_PASSWORD_SECRET,
      environment.FORGOT_PASSWORD_EXPIRATION,
      findUserByEmailRepository
    );
    const deleteAccountService = new DeleteAccountService(
      getAccountRepository,
      deleteAccountRepository
    );
    const getExchangeRateService = new GetExchangeRateService(
      getExchangeRateRepository,
      exchangeRateProvider,
      syncExchangeRateRepository
    );
    const updateTransactionService = new UpdateTransactionService(
      getTransactionRepository,
      updateTransactionRepository
    );

    // Controllers
    const homeController =
      this._serviceCollection.homeController ?? new HomeController();
    const createUserController =
      this._serviceCollection.createUserController ??
      new CreateUserController(createUserService);
    const createLinkTokenController =
      this._serviceCollection.createLinkTokenController ??
      new CreateLinkTokenController(authMiddleware, createLinkTokenService);
    const loginController =
      this._serviceCollection.loginController ??
      new LoginController(serverEnvironment.NODE_ENV, loginService);
    const refreshTokenController =
      this._serviceCollection.refreshTokenController ??
      new RefreshTokenController(
        serverEnvironment.NODE_ENV,
        refreshTokenService
      );
    const logoutController =
      this._serviceCollection.logoutController ??
      new LogoutController(authMiddleware);
    const createInstitutionController =
      this._serviceCollection.createInstitutionController ??
      new CreateInstitutionController(authMiddleware, createInstitutionService);
    const findInstitutionsController =
      this._serviceCollection.findInstitutionsController ??
      new FindInstitutionsController(authMiddleware, findInstitutionsService);
    const syncInstitutionsController =
      this._serviceCollection.syncInstitutionsController ??
      new SyncInstitutionsController(authMiddleware, syncInstitutionsService);
    const findTransactionsController =
      this._serviceCollection.findTransactionsController ??
      new FindTransactionsController(authMiddleware, findTransactionsService);
    const getWalletController = new GetWalletController(
      authMiddleware,
      getWalletService
    );
    const updateTransactionCategoryController =
      new UpdateTransactionCategoryController(
        authMiddleware,
        updateTransactionCategoryService
      );
    const findCategoriesController = new FindCategoriesController(
      authMiddleware,
      findCategoriesService
    );
    const createCategoryController = new CreateCategoryController(
      authMiddleware,
      createCategoryService
    );
    const findAccountHistoryController = new FindAccountHistoryController(
      authMiddleware,
      findAccountHistoryService
    );
    const updateEmailController = new UpdateEmailController(
      authMiddleware,
      updateEmailService
    );
    const verifyUpdateEmailController = new VerifyUpdateEmailController(
      verifyUpdateEmailService
    );
    const updatePasswordController = new UpdatePasswordController(
      authMiddleware,
      updatePasswordService
    );
    const forgotPasswordController = new ForgotPasswordController(
      forgotPasswordService
    );
    const deleteAccountController = new DeleteAccountController(
      authMiddleware,
      deleteAccountService
    );
    const getExchangeRateController = new GetExchangeRateController(
      authMiddleware,
      getExchangeRateService
    );
    const updateTransactionController = new UpdateTransactionController(
      authMiddleware,
      updateTransactionService
    );

    const serviceCollection: IServiceCollection = {
      // Environment
      environment: serverEnvironment,
      // Events
      serviceEventBus,
      // Plaid
      plaid,
      // Prisma
      prisma,
      // Providers
      financialProvider,
      transcriptionProvider,
      emailProvider,
      exchangeRateProvider,
      // Repositories
      createUserRepository,
      findUserByEmailRepository,
      getUserRepository,
      getAccountRepository,
      createAccountHistoryRepository,
      createInstitutionRepository,
      findInstitutionsRepository,
      findTransactionsRepository,
      getWalletRepository,
      createWalletRepository,
      updateWalletRepository,
      findCategoriesRepository,
      createCategoryRepository,
      getCategoryRepository,
      findAccountHistoryRepository,
      updateEmailRepository,
      updatePasswordRepository,
      deleteAccountRepository,
      updateTransactionRepository,
      createTransactionCategoryRepository,
      deleteTransactionCategoryRepository,
      // Services
      getUserService,
      createUserService,
      createLinkTokenService,
      loginService,
      refreshTokenService,
      syncAccountsService,
      createAccountHistoryService,
      createInstitutionService,
      findInstitutionsService,
      findTransactionsService,
      updateTransactionCategoryService,
      syncInstitutionsService,
      createWalletService,
      updateWalletService,
      getWalletService,
      findCategoriesService,
      createCategoryService,
      findAccountHistoryService,
      updateEmailService: updateEmailService,
      verifyUpdateEmailService,
      updatePasswordService,
      forgotPasswordService,
      deleteAccountService,
      getExchangeRateService,
      updateTransactionService,
      // Controllers
      homeController,
      createUserController,
      createLinkTokenController,
      loginController,
      refreshTokenController,
      logoutController,
      createInstitutionController,
      findInstitutionsController,
      syncInstitutionsController,
      findTransactionsController,
      getWalletController,
      updateTransactionCategoryController,
      findCategoriesController,
      createCategoryController,
      findAccountHistoryController,
      updateEmailController,
      verifyUpdateEmailController,
      updatePasswordController,
      forgotPasswordController,
      deleteAccountController,
      getExchangeRateController,
      updateTransactionController
    };

    return serviceCollection;
  }
}
