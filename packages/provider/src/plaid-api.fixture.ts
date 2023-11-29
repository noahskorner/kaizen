/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosHeaderValue, AxiosHeaders, AxiosResponse } from 'axios';
import axios from 'axios';
import {
  AccountsBalanceGetRequest,
  AccountsGetRequest,
  AccountsGetResponse,
  ApplicationGetRequest,
  ApplicationGetResponse,
  AssetReportAuditCopyCreateRequest,
  AssetReportAuditCopyCreateResponse,
  AssetReportAuditCopyGetRequest,
  AssetReportAuditCopyRemoveRequest,
  AssetReportAuditCopyRemoveResponse,
  AssetReportCreateRequest,
  AssetReportCreateResponse,
  AssetReportFilterRequest,
  AssetReportFilterResponse,
  AssetReportFreddieGetResponse,
  AssetReportGetRequest,
  AssetReportGetResponse,
  AssetReportPDFGetRequest,
  AssetReportRefreshRequest,
  AssetReportRefreshResponse,
  AssetReportRemoveRequest,
  AssetReportRemoveResponse,
  AuthGetRequest,
  AuthGetResponse,
  BankTransferBalanceGetRequest,
  BankTransferBalanceGetResponse,
  BankTransferCancelRequest,
  BankTransferCancelResponse,
  BankTransferCreateRequest,
  BankTransferCreateResponse,
  BankTransferEventListRequest,
  BankTransferEventListResponse,
  BankTransferEventSyncRequest,
  BankTransferEventSyncResponse,
  BankTransferGetRequest,
  BankTransferGetResponse,
  BankTransferListRequest,
  BankTransferListResponse,
  BankTransferMigrateAccountRequest,
  BankTransferMigrateAccountResponse,
  BankTransferSweepGetRequest,
  BankTransferSweepGetResponse,
  BankTransferSweepListRequest,
  BankTransferSweepListResponse,
  BaseReportGetRequest,
  BaseReportGetResponse,
  BeaconReportCreateRequest,
  BeaconReportCreateResponse,
  BeaconReportListRequest,
  BeaconReportListResponse,
  BeaconReportSyndicationListRequest,
  BeaconReportSyndicationListResponse,
  BeaconUserCreateRequest,
  BeaconUserCreateResponse,
  BeaconUserGetRequest,
  BeaconUserGetResponse,
  BeaconUserReviewRequest,
  CategoriesGetResponse,
  Configuration,
  CraBankIncomeGetRequest,
  CraBankIncomeGetResponse,
  CreditAuditCopyTokenCreateRequest,
  CreditAuditCopyTokenCreateResponse,
  CreditAuditCopyTokenRemoveRequest,
  CreditAuditCopyTokenRemoveResponse,
  CreditAuditCopyTokenUpdateRequest,
  CreditAuditCopyTokenUpdateResponse,
  CreditBankEmploymentGetRequest,
  CreditBankEmploymentGetResponse,
  CreditBankIncomeGetRequest,
  CreditBankIncomeGetResponse,
  CreditBankIncomePDFGetRequest,
  CreditBankIncomeRefreshRequest,
  CreditBankIncomeRefreshResponse,
  CreditBankIncomeWebhookUpdateRequest,
  CreditBankIncomeWebhookUpdateResponse,
  CreditBankStatementsUploadsGetRequest,
  CreditBankStatementsUploadsGetResponse,
  CreditEmploymentGetRequest,
  CreditEmploymentGetResponse,
  CreditFreddieMacReportsGetRequest,
  CreditFreddieMacReportsGetResponse,
  CreditPayrollIncomeGetRequest,
  CreditPayrollIncomeGetResponse,
  CreditPayrollIncomeParsingConfigUpdateResponse,
  CreditPayrollIncomePrecheckRequest,
  CreditPayrollIncomePrecheckResponse,
  CreditPayrollIncomeRefreshRequest,
  CreditPayrollIncomeRefreshResponse,
  CreditPayrollIncomeRiskSignalsGetRequest,
  CreditPayrollIncomeRiskSignalsGetResponse,
  CreditRelayCreateRequest,
  CreditRelayCreateResponse,
  CreditRelayGetRequest,
  CreditRelayPDFGetRequest,
  CreditRelayRefreshRequest,
  CreditRelayRefreshResponse,
  CreditRelayRemoveRequest,
  CreditRelayRemoveResponse,
  CreditSessionsGetRequest,
  CreditSessionsGetResponse,
  DashboardUserGetRequest,
  DashboardUserGetResponse,
  DashboardUserListRequest,
  DashboardUserListResponse,
  DepositSwitchAltCreateRequest,
  DepositSwitchAltCreateResponse,
  DepositSwitchCreateRequest,
  DepositSwitchCreateResponse,
  DepositSwitchGetRequest,
  DepositSwitchGetResponse,
  DepositSwitchTokenCreateRequest,
  DepositSwitchTokenCreateResponse,
  EmployersSearchRequest,
  EmployersSearchResponse,
  EmploymentVerificationGetRequest,
  EmploymentVerificationGetResponse,
  FDXNotification,
  IdentityGetRequest,
  IdentityGetResponse,
  IdentityMatchRequest,
  IdentityMatchResponse,
  IdentityRefreshRequest,
  IdentityRefreshResponse,
  IdentityVerificationCreateRequest,
  IdentityVerificationCreateResponse,
  IdentityVerificationGetRequest,
  IdentityVerificationGetResponse,
  IdentityVerificationListRequest,
  IdentityVerificationListResponse,
  IdentityVerificationRetryRequest,
  IdentityVerificationRetryResponse,
  IncomeVerificationCreateRequest,
  IncomeVerificationCreateResponse,
  IncomeVerificationDocumentsDownloadRequest,
  IncomeVerificationPaystubsGetRequest,
  IncomeVerificationPaystubsGetResponse,
  IncomeVerificationPrecheckRequest,
  IncomeVerificationPrecheckResponse,
  IncomeVerificationTaxformsGetRequest,
  IncomeVerificationTaxformsGetResponse,
  InstitutionsGetByIdRequest,
  InstitutionsGetByIdResponse,
  InstitutionsGetRequest,
  InstitutionsGetResponse,
  InstitutionsSearchRequest,
  InstitutionsSearchResponse,
  InvestmentsAuthGetRequest,
  InvestmentsAuthGetResponse,
  InvestmentsHoldingsGetRequest,
  InvestmentsHoldingsGetResponse,
  InvestmentsRefreshRequest,
  InvestmentsRefreshResponse,
  InvestmentsTransactionsGetRequest,
  InvestmentsTransactionsGetResponse,
  ItemAccessTokenInvalidateRequest,
  ItemAccessTokenInvalidateResponse,
  ItemActivityListRequest,
  ItemActivityListResponse,
  ItemApplicationListRequest,
  ItemApplicationListResponse,
  ItemApplicationScopesUpdateRequest,
  ItemApplicationScopesUpdateResponse,
  ItemApplicationUnlinkRequest,
  ItemApplicationUnlinkResponse,
  ItemGetRequest,
  ItemGetResponse,
  ItemImportRequest,
  ItemImportResponse,
  ItemPublicTokenCreateRequest,
  ItemPublicTokenCreateResponse,
  ItemPublicTokenExchangeRequest,
  ItemPublicTokenExchangeResponse,
  ItemRemoveRequest,
  ItemRemoveResponse,
  ItemWebhookUpdateRequest,
  ItemWebhookUpdateResponse,
  LiabilitiesGetRequest,
  LiabilitiesGetResponse,
  LinkDeliveryCreateRequest,
  LinkDeliveryCreateResponse,
  LinkDeliveryGetRequest,
  LinkDeliveryGetResponse,
  LinkOAuthCorrelationIdExchangeRequest,
  LinkOAuthCorrelationIdExchangeResponse,
  LinkTokenCreateRequest,
  LinkTokenCreateResponse,
  LinkTokenGetRequest,
  LinkTokenGetResponse,
  PartnerCustomerCreateRequest,
  PartnerCustomerCreateResponse,
  PartnerCustomerEnableRequest,
  PartnerCustomerEnableResponse,
  PartnerCustomerGetRequest,
  PartnerCustomerGetResponse,
  PartnerCustomerOAuthInstitutionsGetRequest,
  PartnerCustomerOAuthInstitutionsGetResponse,
  PartnerCustomerRemoveRequest,
  PartnerCustomerRemoveResponse,
  PaymentInitiationConsentCreateRequest,
  PaymentInitiationConsentCreateResponse,
  PaymentInitiationConsentGetRequest,
  PaymentInitiationConsentGetResponse,
  PaymentInitiationConsentPaymentExecuteRequest,
  PaymentInitiationConsentPaymentExecuteResponse,
  PaymentInitiationConsentRevokeRequest,
  PaymentInitiationConsentRevokeResponse,
  PaymentInitiationPaymentCreateRequest,
  PaymentInitiationPaymentCreateResponse,
  PaymentInitiationPaymentGetRequest,
  PaymentInitiationPaymentGetResponse,
  PaymentInitiationPaymentListRequest,
  PaymentInitiationPaymentListResponse,
  PaymentInitiationPaymentReverseRequest,
  PaymentInitiationPaymentReverseResponse,
  PaymentInitiationPaymentTokenCreateRequest,
  PaymentInitiationPaymentTokenCreateResponse,
  PaymentInitiationRecipientCreateRequest,
  PaymentInitiationRecipientCreateResponse,
  PaymentInitiationRecipientGetRequest,
  PaymentInitiationRecipientGetResponse,
  PaymentInitiationRecipientListRequest,
  PaymentInitiationRecipientListResponse,
  PaymentProfileCreateRequest,
  PaymentProfileCreateResponse,
  PaymentProfileGetRequest,
  PaymentProfileGetResponse,
  PaymentProfileRemoveRequest,
  PaymentProfileRemoveResponse,
  PlaidApi,
  PlaidEnvironments,
  ProcessorAccountGetRequest,
  ProcessorAccountGetResponse,
  ProcessorApexProcessorTokenCreateRequest,
  ProcessorAuthGetRequest,
  ProcessorAuthGetResponse,
  ProcessorBalanceGetRequest,
  ProcessorBalanceGetResponse,
  ProcessorBankTransferCreateRequest,
  ProcessorBankTransferCreateResponse,
  ProcessorIdentityGetRequest,
  ProcessorIdentityGetResponse,
  ProcessorIdentityMatchRequest,
  ProcessorIdentityMatchResponse,
  ProcessorSignalDecisionReportRequest,
  ProcessorSignalDecisionReportResponse,
  ProcessorSignalEvaluateRequest,
  ProcessorSignalEvaluateResponse,
  ProcessorSignalPrepareRequest,
  ProcessorSignalPrepareResponse,
  ProcessorSignalReturnReportRequest,
  ProcessorSignalReturnReportResponse,
  ProcessorStripeBankAccountTokenCreateRequest,
  ProcessorStripeBankAccountTokenCreateResponse,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateResponse,
  ProcessorTokenPermissionsGetRequest,
  ProcessorTokenPermissionsGetResponse,
  ProcessorTokenPermissionsSetRequest,
  ProcessorTokenPermissionsSetResponse,
  ProcessorTokenWebhookUpdateRequest,
  ProcessorTokenWebhookUpdateResponse,
  ProcessorTransactionsGetRequest,
  ProcessorTransactionsGetResponse,
  ProcessorTransactionsRecurringGetRequest,
  ProcessorTransactionsRecurringGetResponse,
  ProcessorTransactionsRefreshRequest,
  ProcessorTransactionsRefreshResponse,
  ProcessorTransactionsSyncRequest,
  ProcessorTransactionsSyncResponse,
  SandboxBankIncomeFireWebhookRequest,
  SandboxBankIncomeFireWebhookResponse,
  SandboxBankTransferFireWebhookRequest,
  SandboxBankTransferFireWebhookResponse,
  SandboxBankTransferSimulateRequest,
  SandboxBankTransferSimulateResponse,
  SandboxIncomeFireWebhookRequest,
  SandboxIncomeFireWebhookResponse,
  SandboxItemFireWebhookRequest,
  SandboxItemFireWebhookResponse,
  SandboxItemResetLoginRequest,
  SandboxItemResetLoginResponse,
  SandboxItemSetVerificationStatusRequest,
  SandboxItemSetVerificationStatusResponse,
  SandboxOauthSelectAccountsRequest,
  SandboxPaymentProfileResetLoginRequest,
  SandboxPaymentProfileResetLoginResponse,
  SandboxProcessorTokenCreateRequest,
  SandboxProcessorTokenCreateResponse,
  SandboxPublicTokenCreateRequest,
  SandboxPublicTokenCreateResponse,
  SandboxTransferFireWebhookRequest,
  SandboxTransferFireWebhookResponse,
  SandboxTransferLedgerDepositSimulateRequest,
  SandboxTransferLedgerDepositSimulateResponse,
  SandboxTransferLedgerSimulateAvailableRequest,
  SandboxTransferLedgerSimulateAvailableResponse,
  SandboxTransferLedgerWithdrawSimulateRequest,
  SandboxTransferLedgerWithdrawSimulateResponse,
  SandboxTransferRefundSimulateRequest,
  SandboxTransferRefundSimulateResponse,
  SandboxTransferRepaymentSimulateRequest,
  SandboxTransferRepaymentSimulateResponse,
  SandboxTransferSimulateRequest,
  SandboxTransferSimulateResponse,
  SandboxTransferSweepSimulateRequest,
  SandboxTransferSweepSimulateResponse,
  SandboxTransferTestClockAdvanceRequest,
  SandboxTransferTestClockAdvanceResponse,
  SandboxTransferTestClockCreateRequest,
  SandboxTransferTestClockCreateResponse,
  SandboxTransferTestClockGetRequest,
  SandboxTransferTestClockGetResponse,
  SandboxTransferTestClockListRequest,
  SandboxTransferTestClockListResponse,
  SignalDecisionReportRequest,
  SignalDecisionReportResponse,
  SignalEvaluateRequest,
  SignalEvaluateResponse,
  SignalPrepareRequest,
  SignalPrepareResponse,
  SignalReturnReportRequest,
  SignalReturnReportResponse,
  StatementsDownloadRequest,
  StatementsListRequest,
  StatementsListResponse,
  TransactionsEnhanceGetRequest,
  TransactionsEnhanceGetResponse,
  TransactionsEnrichRequest,
  TransactionsEnrichResponse,
  TransactionsGetRequest,
  TransactionsGetResponse,
  TransactionsRecurringGetRequest,
  TransactionsRecurringGetResponse,
  TransactionsRefreshRequest,
  TransactionsRefreshResponse,
  TransactionsRulesCreateRequest,
  TransactionsRulesCreateResponse,
  TransactionsRulesListRequest,
  TransactionsRulesListResponse,
  TransactionsRulesRemoveRequest,
  TransactionsRulesRemoveResponse,
  TransactionsSyncRequest,
  TransactionsSyncResponse,
  TransactionsUserInsightsGetRequest,
  TransactionsUserInsightsGetResponse,
  TransferAuthorizationCreateRequest,
  TransferAuthorizationCreateResponse,
  TransferBalanceGetRequest,
  TransferBalanceGetResponse,
  TransferCancelRequest,
  TransferCancelResponse,
  TransferCapabilitiesGetRequest,
  TransferCapabilitiesGetResponse,
  TransferConfigurationGetRequest,
  TransferConfigurationGetResponse,
  TransferCreateRequest,
  TransferCreateResponse,
  TransferDiligenceDocumentUploadRequest,
  TransferDiligenceDocumentUploadResponse,
  TransferDiligenceSubmitRequest,
  TransferDiligenceSubmitResponse,
  TransferEventListRequest,
  TransferEventListResponse,
  TransferEventSyncRequest,
  TransferEventSyncResponse,
  TransferGetRequest,
  TransferGetResponse,
  TransferIntentCreateRequest,
  TransferIntentCreateResponse,
  TransferIntentGetResponse,
  TransferLedgerDepositRequest,
  TransferLedgerDepositResponse,
  TransferLedgerDistributeRequest,
  TransferLedgerDistributeResponse,
  TransferLedgerGetRequest,
  TransferLedgerGetResponse,
  TransferLedgerWithdrawRequest,
  TransferLedgerWithdrawResponse,
  TransferListRequest,
  TransferListResponse,
  TransferMetricsGetRequest,
  TransferMetricsGetResponse,
  TransferMigrateAccountRequest,
  TransferMigrateAccountResponse,
  TransferOriginatorCreateRequest,
  TransferOriginatorCreateResponse,
  TransferOriginatorFundingAccountUpdateRequest,
  TransferOriginatorFundingAccountUpdateResponse,
  TransferOriginatorGetRequest,
  TransferOriginatorGetResponse,
  TransferOriginatorListRequest,
  TransferOriginatorListResponse,
  TransferQuestionnaireCreateRequest,
  TransferQuestionnaireCreateResponse,
  TransferRecurringCancelRequest,
  TransferRecurringCancelResponse,
  TransferRecurringCreateRequest,
  TransferRecurringCreateResponse,
  TransferRecurringGetRequest,
  TransferRecurringGetResponse,
  TransferRecurringListRequest,
  TransferRecurringListResponse,
  TransferRefundCancelRequest,
  TransferRefundCancelResponse,
  TransferRefundCreateRequest,
  TransferRefundCreateResponse,
  TransferRefundGetRequest,
  TransferRefundGetResponse,
  TransferRepaymentListRequest,
  TransferRepaymentListResponse,
  TransferRepaymentReturnListRequest,
  TransferRepaymentReturnListResponse,
  TransferSweepGetRequest,
  TransferSweepGetResponse,
  TransferSweepListRequest,
  TransferSweepListResponse,
  UserCreateRequest,
  UserCreateResponse,
  UserUpdateRequest,
  UserUpdateResponse,
  WalletCreateRequest,
  WalletCreateResponse,
  WalletGetRequest,
  WalletGetResponse,
  WalletListRequest,
  WalletListResponse,
  WalletTransactionExecuteRequest,
  WalletTransactionExecuteResponse,
  WalletTransactionGetRequest,
  WalletTransactionGetResponse,
  WalletTransactionListRequest,
  WalletTransactionListResponse,
  WatchlistScreeningEntityCreateRequest,
  WatchlistScreeningEntityCreateResponse,
  WatchlistScreeningEntityGetRequest,
  WatchlistScreeningEntityGetResponse,
  WatchlistScreeningEntityHistoryListRequest,
  WatchlistScreeningEntityHistoryListResponse,
  WatchlistScreeningEntityHitListRequest,
  WatchlistScreeningEntityHitListResponse,
  WatchlistScreeningEntityListRequest,
  WatchlistScreeningEntityListResponse,
  WatchlistScreeningEntityProgramGetRequest,
  WatchlistScreeningEntityProgramGetResponse,
  WatchlistScreeningEntityProgramListRequest,
  WatchlistScreeningEntityProgramListResponse,
  WatchlistScreeningEntityReviewCreateRequest,
  WatchlistScreeningEntityReviewCreateResponse,
  WatchlistScreeningEntityReviewListRequest,
  WatchlistScreeningEntityReviewListResponse,
  WatchlistScreeningEntityUpdateRequest,
  WatchlistScreeningEntityUpdateResponse,
  WatchlistScreeningIndividualCreateRequest,
  WatchlistScreeningIndividualCreateResponse,
  WatchlistScreeningIndividualGetRequest,
  WatchlistScreeningIndividualGetResponse,
  WatchlistScreeningIndividualHistoryListRequest,
  WatchlistScreeningIndividualHistoryListResponse,
  WatchlistScreeningIndividualHitListRequest,
  WatchlistScreeningIndividualHitListResponse,
  WatchlistScreeningIndividualListRequest,
  WatchlistScreeningIndividualListResponse,
  WatchlistScreeningIndividualProgramGetRequest,
  WatchlistScreeningIndividualProgramGetResponse,
  WatchlistScreeningIndividualProgramListRequest,
  WatchlistScreeningIndividualProgramListResponse,
  WatchlistScreeningIndividualReviewCreateRequest,
  WatchlistScreeningIndividualReviewCreateResponse,
  WatchlistScreeningIndividualReviewListRequest,
  WatchlistScreeningIndividualReviewListResponse,
  WatchlistScreeningIndividualUpdateRequest,
  WatchlistScreeningIndividualUpdateResponse,
  WebhookVerificationKeyGetRequest,
  WebhookVerificationKeyGetResponse
} from 'plaid';
import { BaseAPI } from 'plaid/dist/base';

export const mockLinkToken = 'TEST_LINK_TOKEN';

export const mockPlaidApi: PlaidApi = Object.assign(new BaseAPI(), {
  accountsBalanceGet: function (
    accountsBalanceGetRequest: AccountsBalanceGetRequest,
    options?: any
  ): Promise<AxiosResponse<AccountsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  accountsGet: function (
    accountsGetRequest: AccountsGetRequest,
    options?: any
  ): Promise<AxiosResponse<AccountsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  applicationGet: function (
    applicationGetRequest: ApplicationGetRequest,
    options?: any
  ): Promise<AxiosResponse<ApplicationGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  assetReportAuditCopyCreate: function (
    assetReportAuditCopyCreateRequest: AssetReportAuditCopyCreateRequest,
    options?: any
  ): Promise<AxiosResponse<AssetReportAuditCopyCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  assetReportAuditCopyGet: function (
    assetReportAuditCopyGetRequest: AssetReportAuditCopyGetRequest,
    options?: any
  ): Promise<AxiosResponse<AssetReportGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  assetReportAuditCopyRemove: function (
    assetReportAuditCopyRemoveRequest: AssetReportAuditCopyRemoveRequest,
    options?: any
  ): Promise<AxiosResponse<AssetReportAuditCopyRemoveResponse, any>> {
    throw new Error('Function not implemented.');
  },
  assetReportCreate: function (
    assetReportCreateRequest: AssetReportCreateRequest,
    options?: any
  ): Promise<AxiosResponse<AssetReportCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  assetReportFilter: function (
    assetReportFilterRequest: AssetReportFilterRequest,
    options?: any
  ): Promise<AxiosResponse<AssetReportFilterResponse, any>> {
    throw new Error('Function not implemented.');
  },
  assetReportGet: function (
    assetReportGetRequest: AssetReportGetRequest,
    options?: any
  ): Promise<AxiosResponse<AssetReportGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  assetReportPdfGet: function (
    assetReportPDFGetRequest: AssetReportPDFGetRequest,
    options?: any
  ): Promise<AxiosResponse<any, any>> {
    throw new Error('Function not implemented.');
  },
  assetReportRefresh: function (
    assetReportRefreshRequest: AssetReportRefreshRequest,
    options?: any
  ): Promise<AxiosResponse<AssetReportRefreshResponse, any>> {
    throw new Error('Function not implemented.');
  },
  assetReportRemove: function (
    assetReportRemoveRequest: AssetReportRemoveRequest,
    options?: any
  ): Promise<AxiosResponse<AssetReportRemoveResponse, any>> {
    throw new Error('Function not implemented.');
  },
  authGet: function (
    authGetRequest: AuthGetRequest,
    options?: any
  ): Promise<AxiosResponse<AuthGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  bankTransferBalanceGet: function (
    bankTransferBalanceGetRequest: BankTransferBalanceGetRequest,
    options?: any
  ): Promise<AxiosResponse<BankTransferBalanceGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  bankTransferCancel: function (
    bankTransferCancelRequest: BankTransferCancelRequest,
    options?: any
  ): Promise<AxiosResponse<BankTransferCancelResponse, any>> {
    throw new Error('Function not implemented.');
  },
  bankTransferCreate: function (
    bankTransferCreateRequest: BankTransferCreateRequest,
    options?: any
  ): Promise<AxiosResponse<BankTransferCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  bankTransferEventList: function (
    bankTransferEventListRequest: BankTransferEventListRequest,
    options?: any
  ): Promise<AxiosResponse<BankTransferEventListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  bankTransferEventSync: function (
    bankTransferEventSyncRequest: BankTransferEventSyncRequest,
    options?: any
  ): Promise<AxiosResponse<BankTransferEventSyncResponse, any>> {
    throw new Error('Function not implemented.');
  },
  bankTransferGet: function (
    bankTransferGetRequest: BankTransferGetRequest,
    options?: any
  ): Promise<AxiosResponse<BankTransferGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  bankTransferList: function (
    bankTransferListRequest: BankTransferListRequest,
    options?: any
  ): Promise<AxiosResponse<BankTransferListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  bankTransferMigrateAccount: function (
    bankTransferMigrateAccountRequest: BankTransferMigrateAccountRequest,
    options?: any
  ): Promise<AxiosResponse<BankTransferMigrateAccountResponse, any>> {
    throw new Error('Function not implemented.');
  },
  bankTransferSweepGet: function (
    bankTransferSweepGetRequest: BankTransferSweepGetRequest,
    options?: any
  ): Promise<AxiosResponse<BankTransferSweepGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  bankTransferSweepList: function (
    bankTransferSweepListRequest: BankTransferSweepListRequest,
    options?: any
  ): Promise<AxiosResponse<BankTransferSweepListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  baseReportGet: function (
    baseReportGetRequest: BaseReportGetRequest,
    options?: any
  ): Promise<AxiosResponse<BaseReportGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  beaconReportCreate: function (
    beaconReportCreateRequest: BeaconReportCreateRequest,
    options?: any
  ): Promise<AxiosResponse<BeaconReportCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  beaconReportList: function (
    beaconReportListRequest: BeaconReportListRequest,
    options?: any
  ): Promise<AxiosResponse<BeaconReportListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  beaconReportSyndicationList: function (
    beaconReportSyndicationListRequest: BeaconReportSyndicationListRequest,
    options?: any
  ): Promise<AxiosResponse<BeaconReportSyndicationListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  beaconUserCreate: function (
    beaconUserCreateRequest: BeaconUserCreateRequest,
    options?: any
  ): Promise<AxiosResponse<BeaconUserCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  beaconUserGet: function (
    beaconUserGetRequest: BeaconUserGetRequest,
    options?: any
  ): Promise<AxiosResponse<BeaconUserGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  beaconUserReview: function (
    beaconUserReviewRequest: BeaconUserReviewRequest,
    options?: any
  ): Promise<AxiosResponse<BeaconUserGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  categoriesGet: function (
    body: object,
    options?: any
  ): Promise<AxiosResponse<CategoriesGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  craBankIncomeGet: function (
    craBankIncomeGetRequest: CraBankIncomeGetRequest,
    options?: any
  ): Promise<AxiosResponse<CraBankIncomeGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  createPaymentToken: function (
    paymentInitiationPaymentTokenCreateRequest: PaymentInitiationPaymentTokenCreateRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentInitiationPaymentTokenCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditAssetReportFreddieMacGet: function (
    requestBody: { [key: string]: object },
    options?: any
  ): Promise<AxiosResponse<AssetReportFreddieGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditAuditCopyTokenCreate: function (
    creditAuditCopyTokenCreateRequest: CreditAuditCopyTokenCreateRequest,
    options?: any
  ): Promise<AxiosResponse<CreditAuditCopyTokenCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditAuditCopyTokenUpdate: function (
    creditAuditCopyTokenUpdateRequest: CreditAuditCopyTokenUpdateRequest,
    options?: any
  ): Promise<AxiosResponse<CreditAuditCopyTokenUpdateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditBankEmploymentGet: function (
    creditBankEmploymentGetRequest: CreditBankEmploymentGetRequest,
    options?: any
  ): Promise<AxiosResponse<CreditBankEmploymentGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditBankIncomeGet: function (
    creditBankIncomeGetRequest: CreditBankIncomeGetRequest,
    options?: any
  ): Promise<AxiosResponse<CreditBankIncomeGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditBankIncomePdfGet: function (
    creditBankIncomePDFGetRequest: CreditBankIncomePDFGetRequest,
    options?: any
  ): Promise<AxiosResponse<any, any>> {
    throw new Error('Function not implemented.');
  },
  creditBankIncomeRefresh: function (
    creditBankIncomeRefreshRequest: CreditBankIncomeRefreshRequest,
    options?: any
  ): Promise<AxiosResponse<CreditBankIncomeRefreshResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditBankIncomeWebhookUpdate: function (
    creditBankIncomeWebhookUpdateRequest: CreditBankIncomeWebhookUpdateRequest,
    options?: any
  ): Promise<AxiosResponse<CreditBankIncomeWebhookUpdateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditBankStatementsUploadsGet: function (
    creditBankStatementsUploadsGetRequest: CreditBankStatementsUploadsGetRequest,
    options?: any
  ): Promise<AxiosResponse<CreditBankStatementsUploadsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditEmploymentGet: function (
    creditEmploymentGetRequest: CreditEmploymentGetRequest,
    options?: any
  ): Promise<AxiosResponse<CreditEmploymentGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditFreddieMacReportsGet: function (
    creditFreddieMacReportsGetRequest: CreditFreddieMacReportsGetRequest,
    options?: any
  ): Promise<AxiosResponse<CreditFreddieMacReportsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditPayrollIncomeGet: function (
    creditPayrollIncomeGetRequest: CreditPayrollIncomeGetRequest,
    options?: any
  ): Promise<AxiosResponse<CreditPayrollIncomeGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditPayrollIncomeParsingConfigUpdate: function (
    requestBody: { [key: string]: object },
    options?: any
  ): Promise<
    AxiosResponse<CreditPayrollIncomeParsingConfigUpdateResponse, any>
  > {
    throw new Error('Function not implemented.');
  },
  creditPayrollIncomePrecheck: function (
    creditPayrollIncomePrecheckRequest: CreditPayrollIncomePrecheckRequest,
    options?: any
  ): Promise<AxiosResponse<CreditPayrollIncomePrecheckResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditPayrollIncomeRefresh: function (
    creditPayrollIncomeRefreshRequest: CreditPayrollIncomeRefreshRequest,
    options?: any
  ): Promise<AxiosResponse<CreditPayrollIncomeRefreshResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditPayrollIncomeRiskSignalsGet: function (
    creditPayrollIncomeRiskSignalsGetRequest: CreditPayrollIncomeRiskSignalsGetRequest,
    options?: any
  ): Promise<AxiosResponse<CreditPayrollIncomeRiskSignalsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditRelayCreate: function (
    creditRelayCreateRequest: CreditRelayCreateRequest,
    options?: any
  ): Promise<AxiosResponse<CreditRelayCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditRelayGet: function (
    creditRelayGetRequest: CreditRelayGetRequest,
    options?: any
  ): Promise<AxiosResponse<AssetReportGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditRelayPdfGet: function (
    creditRelayPDFGetRequest: CreditRelayPDFGetRequest,
    options?: any
  ): Promise<AxiosResponse<any, any>> {
    throw new Error('Function not implemented.');
  },
  creditRelayRefresh: function (
    creditRelayRefreshRequest: CreditRelayRefreshRequest,
    options?: any
  ): Promise<AxiosResponse<CreditRelayRefreshResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditRelayRemove: function (
    creditRelayRemoveRequest: CreditRelayRemoveRequest,
    options?: any
  ): Promise<AxiosResponse<CreditRelayRemoveResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditReportAuditCopyRemove: function (
    creditAuditCopyTokenRemoveRequest: CreditAuditCopyTokenRemoveRequest,
    options?: any
  ): Promise<AxiosResponse<CreditAuditCopyTokenRemoveResponse, any>> {
    throw new Error('Function not implemented.');
  },
  creditSessionsGet: function (
    creditSessionsGetRequest: CreditSessionsGetRequest,
    options?: any
  ): Promise<AxiosResponse<CreditSessionsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  dashboardUserGet: function (
    dashboardUserGetRequest: DashboardUserGetRequest,
    options?: any
  ): Promise<AxiosResponse<DashboardUserGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  dashboardUserList: function (
    dashboardUserListRequest: DashboardUserListRequest,
    options?: any
  ): Promise<AxiosResponse<DashboardUserListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  depositSwitchAltCreate: function (
    depositSwitchAltCreateRequest: DepositSwitchAltCreateRequest,
    options?: any
  ): Promise<AxiosResponse<DepositSwitchAltCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  depositSwitchCreate: function (
    depositSwitchCreateRequest: DepositSwitchCreateRequest,
    options?: any
  ): Promise<AxiosResponse<DepositSwitchCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  depositSwitchGet: function (
    depositSwitchGetRequest: DepositSwitchGetRequest,
    options?: any
  ): Promise<AxiosResponse<DepositSwitchGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  depositSwitchTokenCreate: function (
    depositSwitchTokenCreateRequest: DepositSwitchTokenCreateRequest,
    options?: any
  ): Promise<AxiosResponse<DepositSwitchTokenCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  employersSearch: function (
    employersSearchRequest: EmployersSearchRequest,
    options?: any
  ): Promise<AxiosResponse<EmployersSearchResponse, any>> {
    throw new Error('Function not implemented.');
  },
  employmentVerificationGet: function (
    employmentVerificationGetRequest: EmploymentVerificationGetRequest,
    options?: any
  ): Promise<AxiosResponse<EmploymentVerificationGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  fdxNotifications: function (
    fDXNotification: FDXNotification,
    options?: any
  ): Promise<AxiosResponse<void, any>> {
    throw new Error('Function not implemented.');
  },
  identityGet: function (
    identityGetRequest: IdentityGetRequest,
    options?: any
  ): Promise<AxiosResponse<IdentityGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  identityMatch: function (
    identityMatchRequest: IdentityMatchRequest,
    options?: any
  ): Promise<AxiosResponse<IdentityMatchResponse, any>> {
    throw new Error('Function not implemented.');
  },
  identityRefresh: function (
    identityRefreshRequest: IdentityRefreshRequest,
    options?: any
  ): Promise<AxiosResponse<IdentityRefreshResponse, any>> {
    throw new Error('Function not implemented.');
  },
  identityVerificationCreate: function (
    identityVerificationCreateRequest: IdentityVerificationCreateRequest,
    options?: any
  ): Promise<AxiosResponse<IdentityVerificationCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  identityVerificationGet: function (
    identityVerificationGetRequest: IdentityVerificationGetRequest,
    options?: any
  ): Promise<AxiosResponse<IdentityVerificationGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  identityVerificationList: function (
    identityVerificationListRequest: IdentityVerificationListRequest,
    options?: any
  ): Promise<AxiosResponse<IdentityVerificationListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  identityVerificationRetry: function (
    identityVerificationRetryRequest: IdentityVerificationRetryRequest,
    options?: any
  ): Promise<AxiosResponse<IdentityVerificationRetryResponse, any>> {
    throw new Error('Function not implemented.');
  },
  incomeVerificationCreate: function (
    incomeVerificationCreateRequest: IncomeVerificationCreateRequest,
    options?: any
  ): Promise<AxiosResponse<IncomeVerificationCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  incomeVerificationDocumentsDownload: function (
    incomeVerificationDocumentsDownloadRequest: IncomeVerificationDocumentsDownloadRequest,
    options?: any
  ): Promise<AxiosResponse<any, any>> {
    throw new Error('Function not implemented.');
  },
  incomeVerificationPaystubsGet: function (
    incomeVerificationPaystubsGetRequest: IncomeVerificationPaystubsGetRequest,
    options?: any
  ): Promise<AxiosResponse<IncomeVerificationPaystubsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  incomeVerificationPrecheck: function (
    incomeVerificationPrecheckRequest: IncomeVerificationPrecheckRequest,
    options?: any
  ): Promise<AxiosResponse<IncomeVerificationPrecheckResponse, any>> {
    throw new Error('Function not implemented.');
  },
  incomeVerificationTaxformsGet: function (
    incomeVerificationTaxformsGetRequest: IncomeVerificationTaxformsGetRequest,
    options?: any
  ): Promise<AxiosResponse<IncomeVerificationTaxformsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  institutionsGet: function (
    institutionsGetRequest: InstitutionsGetRequest,
    options?: any
  ): Promise<AxiosResponse<InstitutionsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  institutionsGetById: function (
    institutionsGetByIdRequest: InstitutionsGetByIdRequest,
    options?: any
  ): Promise<AxiosResponse<InstitutionsGetByIdResponse, any>> {
    throw new Error('Function not implemented.');
  },
  institutionsSearch: function (
    institutionsSearchRequest: InstitutionsSearchRequest,
    options?: any
  ): Promise<AxiosResponse<InstitutionsSearchResponse, any>> {
    throw new Error('Function not implemented.');
  },
  investmentsAuthGet: function (
    investmentsAuthGetRequest: InvestmentsAuthGetRequest,
    options?: any
  ): Promise<AxiosResponse<InvestmentsAuthGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  investmentsHoldingsGet: function (
    investmentsHoldingsGetRequest: InvestmentsHoldingsGetRequest,
    options?: any
  ): Promise<AxiosResponse<InvestmentsHoldingsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  investmentsRefresh: function (
    investmentsRefreshRequest: InvestmentsRefreshRequest,
    options?: any
  ): Promise<AxiosResponse<InvestmentsRefreshResponse, any>> {
    throw new Error('Function not implemented.');
  },
  investmentsTransactionsGet: function (
    investmentsTransactionsGetRequest: InvestmentsTransactionsGetRequest,
    options?: any
  ): Promise<AxiosResponse<InvestmentsTransactionsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  itemAccessTokenInvalidate: function (
    itemAccessTokenInvalidateRequest: ItemAccessTokenInvalidateRequest,
    options?: any
  ): Promise<AxiosResponse<ItemAccessTokenInvalidateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  itemActivityList: function (
    itemActivityListRequest: ItemActivityListRequest,
    options?: any
  ): Promise<AxiosResponse<ItemActivityListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  itemApplicationList: function (
    itemApplicationListRequest: ItemApplicationListRequest,
    options?: any
  ): Promise<AxiosResponse<ItemApplicationListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  itemApplicationScopesUpdate: function (
    itemApplicationScopesUpdateRequest: ItemApplicationScopesUpdateRequest,
    options?: any
  ): Promise<AxiosResponse<ItemApplicationScopesUpdateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  itemApplicationUnlink: function (
    itemApplicationUnlinkRequest: ItemApplicationUnlinkRequest,
    options?: any
  ): Promise<AxiosResponse<ItemApplicationUnlinkResponse, any>> {
    throw new Error('Function not implemented.');
  },
  itemCreatePublicToken: function (
    itemPublicTokenCreateRequest: ItemPublicTokenCreateRequest,
    options?: any
  ): Promise<AxiosResponse<ItemPublicTokenCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  itemGet: function (
    itemGetRequest: ItemGetRequest,
    options?: any
  ): Promise<AxiosResponse<ItemGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  itemImport: function (
    itemImportRequest: ItemImportRequest,
    options?: any
  ): Promise<AxiosResponse<ItemImportResponse, any>> {
    throw new Error('Function not implemented.');
  },
  itemPublicTokenExchange: function (
    itemPublicTokenExchangeRequest: ItemPublicTokenExchangeRequest,
    options?: any
  ): Promise<AxiosResponse<ItemPublicTokenExchangeResponse, any>> {
    throw new Error('Function not implemented.');
  },
  itemRemove: function (
    itemRemoveRequest: ItemRemoveRequest,
    options?: any
  ): Promise<AxiosResponse<ItemRemoveResponse, any>> {
    throw new Error('Function not implemented.');
  },
  itemWebhookUpdate: function (
    itemWebhookUpdateRequest: ItemWebhookUpdateRequest,
    options?: any
  ): Promise<AxiosResponse<ItemWebhookUpdateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  liabilitiesGet: function (
    liabilitiesGetRequest: LiabilitiesGetRequest,
    options?: any
  ): Promise<AxiosResponse<LiabilitiesGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  linkDeliveryCreate: function (
    linkDeliveryCreateRequest: LinkDeliveryCreateRequest,
    options?: any
  ): Promise<AxiosResponse<LinkDeliveryCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  linkDeliveryGet: function (
    linkDeliveryGetRequest: LinkDeliveryGetRequest,
    options?: any
  ): Promise<AxiosResponse<LinkDeliveryGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  linkOauthCorrelationIdExchange: function (
    linkOAuthCorrelationIdExchangeRequest: LinkOAuthCorrelationIdExchangeRequest,
    options?: any
  ): Promise<AxiosResponse<LinkOAuthCorrelationIdExchangeResponse, any>> {
    throw new Error('Function not implemented.');
  },
  linkTokenCreate: function (
    linkTokenCreateRequest: LinkTokenCreateRequest,
    options?: any
  ): Promise<AxiosResponse<LinkTokenCreateResponse, any>> {
    const headers: AxiosHeaders = {
      set: function (
        headerName?: string | undefined,
        value?: AxiosHeaderValue | undefined,
        rewrite?:
          | boolean
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): AxiosHeaders {
        throw new Error('Function not implemented.');
      },
      get: () => {
        throw new Error('Function not implemented.');
      },
      has: function (
        header: string,
        matcher?:
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): boolean {
        throw new Error('Function not implemented.');
      },
      delete: function (
        header: string | string[],
        matcher?:
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): boolean {
        throw new Error('Function not implemented.');
      },
      clear: function (
        matcher?:
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): boolean {
        throw new Error('Function not implemented.');
      },
      normalize: function (format: boolean): AxiosHeaders {
        throw new Error('Function not implemented.');
      },
      concat: function (
        ...targets: (string | AxiosHeaders | AxiosHeaders | null | undefined)[]
      ): AxiosHeaders {
        throw new Error('Function not implemented.');
      },
      toJSON: function (asStrings?: boolean | undefined): AxiosHeaders {
        throw new Error('Function not implemented.');
      },
      setContentType: function (
        value: AxiosHeaderValue,
        rewrite?:
          | boolean
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): AxiosHeaders {
        throw new Error('Function not implemented.');
      },
      getContentType: function (
        parser?: RegExp | undefined
      ): RegExpExecArray | null {
        throw new Error('Function not implemented.');
      },
      hasContentType: function (
        matcher?:
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): boolean {
        throw new Error('Function not implemented.');
      },
      setContentLength: function (
        value: AxiosHeaderValue,
        rewrite?:
          | boolean
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): AxiosHeaders {
        throw new Error('Function not implemented.');
      },
      getContentLength: function (
        parser?: RegExp | undefined
      ): RegExpExecArray | null {
        throw new Error('Function not implemented.');
      },
      hasContentLength: function (
        matcher?:
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): boolean {
        throw new Error('Function not implemented.');
      },
      setAccept: function (
        value: AxiosHeaderValue,
        rewrite?:
          | boolean
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): AxiosHeaders {
        throw new Error('Function not implemented.');
      },
      getAccept: function (
        parser?: RegExp | undefined
      ): RegExpExecArray | null {
        throw new Error('Function not implemented.');
      },
      hasAccept: function (
        matcher?:
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): boolean {
        throw new Error('Function not implemented.');
      },
      setUserAgent: function (
        value: AxiosHeaderValue,
        rewrite?:
          | boolean
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): AxiosHeaders {
        throw new Error('Function not implemented.');
      },
      getUserAgent: function (
        parser?: RegExp | undefined
      ): RegExpExecArray | null {
        throw new Error('Function not implemented.');
      },
      hasUserAgent: function (
        matcher?:
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): boolean {
        throw new Error('Function not implemented.');
      },
      setContentEncoding: function (
        value: AxiosHeaderValue,
        rewrite?:
          | boolean
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): AxiosHeaders {
        throw new Error('Function not implemented.');
      },
      getContentEncoding: function (
        parser?: RegExp | undefined
      ): RegExpExecArray | null {
        throw new Error('Function not implemented.');
      },
      hasContentEncoding: function (
        matcher?:
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): boolean {
        throw new Error('Function not implemented.');
      },
      setAuthorization: function (
        value: AxiosHeaderValue,
        rewrite?:
          | boolean
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): AxiosHeaders {
        throw new Error('Function not implemented.');
      },
      getAuthorization: function (
        parser?: RegExp | undefined
      ): RegExpExecArray | null {
        throw new Error('Function not implemented.');
      },
      hasAuthorization: function (
        matcher?:
          | (
              | string
              | RegExp
              | ((this: AxiosHeaders, value: string, name: string) => boolean)
            )
          | undefined
      ): boolean {
        throw new Error('Function not implemented.');
      },
      [Symbol.iterator]: function (): IterableIterator<
        [string, AxiosHeaderValue]
      > {
        throw new Error('Function not implemented.');
      }
    };

    const response: AxiosResponse = {
      data: {
        link_token: mockLinkToken
      },
      status: 200,
      statusText: '',
      headers: {},
      config: {
        headers: headers
      }
    };

    return Promise.resolve(response);
  },
  linkTokenGet: function (
    linkTokenGetRequest: LinkTokenGetRequest,
    options?: any
  ): Promise<AxiosResponse<LinkTokenGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  partnerCustomerCreate: function (
    partnerCustomerCreateRequest: PartnerCustomerCreateRequest,
    options?: any
  ): Promise<AxiosResponse<PartnerCustomerCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  partnerCustomerEnable: function (
    partnerCustomerEnableRequest: PartnerCustomerEnableRequest,
    options?: any
  ): Promise<AxiosResponse<PartnerCustomerEnableResponse, any>> {
    throw new Error('Function not implemented.');
  },
  partnerCustomerGet: function (
    partnerCustomerGetRequest: PartnerCustomerGetRequest,
    options?: any
  ): Promise<AxiosResponse<PartnerCustomerGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  partnerCustomerOauthInstitutionsGet: function (
    partnerCustomerOAuthInstitutionsGetRequest: PartnerCustomerOAuthInstitutionsGetRequest,
    options?: any
  ): Promise<AxiosResponse<PartnerCustomerOAuthInstitutionsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  partnerCustomerRemove: function (
    partnerCustomerRemoveRequest: PartnerCustomerRemoveRequest,
    options?: any
  ): Promise<AxiosResponse<PartnerCustomerRemoveResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentInitiationConsentCreate: function (
    paymentInitiationConsentCreateRequest: PaymentInitiationConsentCreateRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentInitiationConsentCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentInitiationConsentGet: function (
    paymentInitiationConsentGetRequest: PaymentInitiationConsentGetRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentInitiationConsentGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentInitiationConsentPaymentExecute: function (
    paymentInitiationConsentPaymentExecuteRequest: PaymentInitiationConsentPaymentExecuteRequest,
    options?: any
  ): Promise<
    AxiosResponse<PaymentInitiationConsentPaymentExecuteResponse, any>
  > {
    throw new Error('Function not implemented.');
  },
  paymentInitiationConsentRevoke: function (
    paymentInitiationConsentRevokeRequest: PaymentInitiationConsentRevokeRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentInitiationConsentRevokeResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentInitiationPaymentCreate: function (
    paymentInitiationPaymentCreateRequest: PaymentInitiationPaymentCreateRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentInitiationPaymentCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentInitiationPaymentGet: function (
    paymentInitiationPaymentGetRequest: PaymentInitiationPaymentGetRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentInitiationPaymentGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentInitiationPaymentList: function (
    paymentInitiationPaymentListRequest: PaymentInitiationPaymentListRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentInitiationPaymentListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentInitiationPaymentReverse: function (
    paymentInitiationPaymentReverseRequest: PaymentInitiationPaymentReverseRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentInitiationPaymentReverseResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentInitiationRecipientCreate: function (
    paymentInitiationRecipientCreateRequest: PaymentInitiationRecipientCreateRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentInitiationRecipientCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentInitiationRecipientGet: function (
    paymentInitiationRecipientGetRequest: PaymentInitiationRecipientGetRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentInitiationRecipientGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentInitiationRecipientList: function (
    paymentInitiationRecipientListRequest: PaymentInitiationRecipientListRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentInitiationRecipientListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentProfileCreate: function (
    paymentProfileCreateRequest: PaymentProfileCreateRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentProfileCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentProfileGet: function (
    paymentProfileGetRequest: PaymentProfileGetRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentProfileGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  paymentProfileRemove: function (
    paymentProfileRemoveRequest: PaymentProfileRemoveRequest,
    options?: any
  ): Promise<AxiosResponse<PaymentProfileRemoveResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorAccountGet: function (
    processorAccountGetRequest: ProcessorAccountGetRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorAccountGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorApexProcessorTokenCreate: function (
    processorApexProcessorTokenCreateRequest: ProcessorApexProcessorTokenCreateRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorTokenCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorAuthGet: function (
    processorAuthGetRequest: ProcessorAuthGetRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorAuthGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorBalanceGet: function (
    processorBalanceGetRequest: ProcessorBalanceGetRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorBalanceGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorBankTransferCreate: function (
    processorBankTransferCreateRequest: ProcessorBankTransferCreateRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorBankTransferCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorIdentityGet: function (
    processorIdentityGetRequest: ProcessorIdentityGetRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorIdentityGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorIdentityMatch: function (
    processorIdentityMatchRequest: ProcessorIdentityMatchRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorIdentityMatchResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorSignalDecisionReport: function (
    processorSignalDecisionReportRequest: ProcessorSignalDecisionReportRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorSignalDecisionReportResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorSignalEvaluate: function (
    processorSignalEvaluateRequest: ProcessorSignalEvaluateRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorSignalEvaluateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorSignalPrepare: function (
    processorSignalPrepareRequest: ProcessorSignalPrepareRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorSignalPrepareResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorSignalReturnReport: function (
    processorSignalReturnReportRequest: ProcessorSignalReturnReportRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorSignalReturnReportResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorStripeBankAccountTokenCreate: function (
    processorStripeBankAccountTokenCreateRequest: ProcessorStripeBankAccountTokenCreateRequest,
    options?: any
  ): Promise<
    AxiosResponse<ProcessorStripeBankAccountTokenCreateResponse, any>
  > {
    throw new Error('Function not implemented.');
  },
  processorTokenCreate: function (
    processorTokenCreateRequest: ProcessorTokenCreateRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorTokenCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorTokenPermissionsGet: function (
    processorTokenPermissionsGetRequest: ProcessorTokenPermissionsGetRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorTokenPermissionsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorTokenPermissionsSet: function (
    processorTokenPermissionsSetRequest: ProcessorTokenPermissionsSetRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorTokenPermissionsSetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorTokenWebhookUpdate: function (
    processorTokenWebhookUpdateRequest: ProcessorTokenWebhookUpdateRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorTokenWebhookUpdateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorTransactionsGet: function (
    processorTransactionsGetRequest: ProcessorTransactionsGetRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorTransactionsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorTransactionsRecurringGet: function (
    processorTransactionsRecurringGetRequest: ProcessorTransactionsRecurringGetRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorTransactionsRecurringGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorTransactionsRefresh: function (
    processorTransactionsRefreshRequest: ProcessorTransactionsRefreshRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorTransactionsRefreshResponse, any>> {
    throw new Error('Function not implemented.');
  },
  processorTransactionsSync: function (
    processorTransactionsSyncRequest: ProcessorTransactionsSyncRequest,
    options?: any
  ): Promise<AxiosResponse<ProcessorTransactionsSyncResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxBankIncomeFireWebhook: function (
    sandboxBankIncomeFireWebhookRequest: SandboxBankIncomeFireWebhookRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxBankIncomeFireWebhookResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxBankTransferFireWebhook: function (
    sandboxBankTransferFireWebhookRequest: SandboxBankTransferFireWebhookRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxBankTransferFireWebhookResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxBankTransferSimulate: function (
    sandboxBankTransferSimulateRequest: SandboxBankTransferSimulateRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxBankTransferSimulateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxIncomeFireWebhook: function (
    sandboxIncomeFireWebhookRequest: SandboxIncomeFireWebhookRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxIncomeFireWebhookResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxItemFireWebhook: function (
    sandboxItemFireWebhookRequest: SandboxItemFireWebhookRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxItemFireWebhookResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxItemResetLogin: function (
    sandboxItemResetLoginRequest: SandboxItemResetLoginRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxItemResetLoginResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxItemSetVerificationStatus: function (
    sandboxItemSetVerificationStatusRequest: SandboxItemSetVerificationStatusRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxItemSetVerificationStatusResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxOauthSelectAccounts: function (
    sandboxOauthSelectAccountsRequest: SandboxOauthSelectAccountsRequest,
    options?: any
  ): Promise<AxiosResponse<{ [key: string]: object }, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxPaymentProfileResetLogin: function (
    sandboxPaymentProfileResetLoginRequest: SandboxPaymentProfileResetLoginRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxPaymentProfileResetLoginResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxProcessorTokenCreate: function (
    sandboxProcessorTokenCreateRequest: SandboxProcessorTokenCreateRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxProcessorTokenCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxPublicTokenCreate: function (
    sandboxPublicTokenCreateRequest: SandboxPublicTokenCreateRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxPublicTokenCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxTransferFireWebhook: function (
    sandboxTransferFireWebhookRequest: SandboxTransferFireWebhookRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxTransferFireWebhookResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxTransferLedgerDepositSimulate: function (
    sandboxTransferLedgerDepositSimulateRequest: SandboxTransferLedgerDepositSimulateRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxTransferLedgerDepositSimulateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxTransferLedgerSimulateAvailable: function (
    sandboxTransferLedgerSimulateAvailableRequest: SandboxTransferLedgerSimulateAvailableRequest,
    options?: any
  ): Promise<
    AxiosResponse<SandboxTransferLedgerSimulateAvailableResponse, any>
  > {
    throw new Error('Function not implemented.');
  },
  sandboxTransferLedgerWithdrawSimulate: function (
    sandboxTransferLedgerWithdrawSimulateRequest: SandboxTransferLedgerWithdrawSimulateRequest,
    options?: any
  ): Promise<
    AxiosResponse<SandboxTransferLedgerWithdrawSimulateResponse, any>
  > {
    throw new Error('Function not implemented.');
  },
  sandboxTransferRefundSimulate: function (
    sandboxTransferRefundSimulateRequest: SandboxTransferRefundSimulateRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxTransferRefundSimulateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxTransferRepaymentSimulate: function (
    sandboxTransferRepaymentSimulateRequest: SandboxTransferRepaymentSimulateRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxTransferRepaymentSimulateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxTransferSimulate: function (
    sandboxTransferSimulateRequest: SandboxTransferSimulateRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxTransferSimulateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxTransferSweepSimulate: function (
    sandboxTransferSweepSimulateRequest: SandboxTransferSweepSimulateRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxTransferSweepSimulateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxTransferTestClockAdvance: function (
    sandboxTransferTestClockAdvanceRequest: SandboxTransferTestClockAdvanceRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxTransferTestClockAdvanceResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxTransferTestClockCreate: function (
    sandboxTransferTestClockCreateRequest: SandboxTransferTestClockCreateRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxTransferTestClockCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxTransferTestClockGet: function (
    sandboxTransferTestClockGetRequest: SandboxTransferTestClockGetRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxTransferTestClockGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  sandboxTransferTestClockList: function (
    sandboxTransferTestClockListRequest: SandboxTransferTestClockListRequest,
    options?: any
  ): Promise<AxiosResponse<SandboxTransferTestClockListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  signalDecisionReport: function (
    signalDecisionReportRequest: SignalDecisionReportRequest,
    options?: any
  ): Promise<AxiosResponse<SignalDecisionReportResponse, any>> {
    throw new Error('Function not implemented.');
  },
  signalEvaluate: function (
    signalEvaluateRequest: SignalEvaluateRequest,
    options?: any
  ): Promise<AxiosResponse<SignalEvaluateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  signalPrepare: function (
    signalPrepareRequest: SignalPrepareRequest,
    options?: any
  ): Promise<AxiosResponse<SignalPrepareResponse, any>> {
    throw new Error('Function not implemented.');
  },
  signalReturnReport: function (
    signalReturnReportRequest: SignalReturnReportRequest,
    options?: any
  ): Promise<AxiosResponse<SignalReturnReportResponse, any>> {
    throw new Error('Function not implemented.');
  },
  statementsDownload: function (
    statementsDownloadRequest: StatementsDownloadRequest,
    options?: any
  ): Promise<AxiosResponse<any, any>> {
    throw new Error('Function not implemented.');
  },
  statementsList: function (
    statementsListRequest: StatementsListRequest,
    options?: any
  ): Promise<AxiosResponse<StatementsListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transactionsEnhance: function (
    transactionsEnhanceGetRequest: TransactionsEnhanceGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransactionsEnhanceGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transactionsEnrich: function (
    transactionsEnrichRequest: TransactionsEnrichRequest,
    options?: any
  ): Promise<AxiosResponse<TransactionsEnrichResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transactionsGet: function (
    transactionsGetRequest: TransactionsGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransactionsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transactionsRecurringGet: function (
    transactionsRecurringGetRequest: TransactionsRecurringGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransactionsRecurringGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transactionsRefresh: function (
    transactionsRefreshRequest: TransactionsRefreshRequest,
    options?: any
  ): Promise<AxiosResponse<TransactionsRefreshResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transactionsRulesCreate: function (
    transactionsRulesCreateRequest: TransactionsRulesCreateRequest,
    options?: any
  ): Promise<AxiosResponse<TransactionsRulesCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transactionsRulesList: function (
    transactionsRulesListRequest: TransactionsRulesListRequest,
    options?: any
  ): Promise<AxiosResponse<TransactionsRulesListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transactionsRulesRemove: function (
    transactionsRulesRemoveRequest: TransactionsRulesRemoveRequest,
    options?: any
  ): Promise<AxiosResponse<TransactionsRulesRemoveResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transactionsSync: function (
    transactionsSyncRequest: TransactionsSyncRequest,
    options?: any
  ): Promise<AxiosResponse<TransactionsSyncResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transactionsUserInsightsGet: function (
    transactionsUserInsightsGetRequest: TransactionsUserInsightsGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransactionsUserInsightsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferAuthorizationCreate: function (
    transferAuthorizationCreateRequest: TransferAuthorizationCreateRequest,
    options?: any
  ): Promise<AxiosResponse<TransferAuthorizationCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferBalanceGet: function (
    transferBalanceGetRequest: TransferBalanceGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransferBalanceGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferCancel: function (
    transferCancelRequest: TransferCancelRequest,
    options?: any
  ): Promise<AxiosResponse<TransferCancelResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferCapabilitiesGet: function (
    transferCapabilitiesGetRequest: TransferCapabilitiesGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransferCapabilitiesGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferConfigurationGet: function (
    transferConfigurationGetRequest: TransferConfigurationGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransferConfigurationGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferCreate: function (
    transferCreateRequest: TransferCreateRequest,
    options?: any
  ): Promise<AxiosResponse<TransferCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferDiligenceDocumentUpload: function (
    transferDiligenceDocumentUploadRequest: TransferDiligenceDocumentUploadRequest,
    options?: any
  ): Promise<AxiosResponse<TransferDiligenceDocumentUploadResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferDiligenceSubmit: function (
    transferDiligenceSubmitRequest: TransferDiligenceSubmitRequest,
    options?: any
  ): Promise<AxiosResponse<TransferDiligenceSubmitResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferEventList: function (
    transferEventListRequest: TransferEventListRequest,
    options?: any
  ): Promise<AxiosResponse<TransferEventListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferEventSync: function (
    transferEventSyncRequest: TransferEventSyncRequest,
    options?: any
  ): Promise<AxiosResponse<TransferEventSyncResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferGet: function (
    transferGetRequest: TransferGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransferGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferIntentCreate: function (
    transferIntentCreateRequest: TransferIntentCreateRequest,
    options?: any
  ): Promise<AxiosResponse<TransferIntentCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferIntentGet: function (
    requestBody: { [key: string]: object },
    options?: any
  ): Promise<AxiosResponse<TransferIntentGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferLedgerDeposit: function (
    transferLedgerDepositRequest: TransferLedgerDepositRequest,
    options?: any
  ): Promise<AxiosResponse<TransferLedgerDepositResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferLedgerDistribute: function (
    transferLedgerDistributeRequest: TransferLedgerDistributeRequest,
    options?: any
  ): Promise<AxiosResponse<TransferLedgerDistributeResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferLedgerGet: function (
    transferLedgerGetRequest: TransferLedgerGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransferLedgerGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferLedgerWithdraw: function (
    transferLedgerWithdrawRequest: TransferLedgerWithdrawRequest,
    options?: any
  ): Promise<AxiosResponse<TransferLedgerWithdrawResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferList: function (
    transferListRequest: TransferListRequest,
    options?: any
  ): Promise<AxiosResponse<TransferListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferMetricsGet: function (
    transferMetricsGetRequest: TransferMetricsGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransferMetricsGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferMigrateAccount: function (
    transferMigrateAccountRequest: TransferMigrateAccountRequest,
    options?: any
  ): Promise<AxiosResponse<TransferMigrateAccountResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferOriginatorCreate: function (
    transferOriginatorCreateRequest: TransferOriginatorCreateRequest,
    options?: any
  ): Promise<AxiosResponse<TransferOriginatorCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferOriginatorFundingAccountUpdate: function (
    transferOriginatorFundingAccountUpdateRequest: TransferOriginatorFundingAccountUpdateRequest,
    options?: any
  ): Promise<
    AxiosResponse<TransferOriginatorFundingAccountUpdateResponse, any>
  > {
    throw new Error('Function not implemented.');
  },
  transferOriginatorGet: function (
    transferOriginatorGetRequest: TransferOriginatorGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransferOriginatorGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferOriginatorList: function (
    transferOriginatorListRequest: TransferOriginatorListRequest,
    options?: any
  ): Promise<AxiosResponse<TransferOriginatorListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferQuestionnaireCreate: function (
    transferQuestionnaireCreateRequest: TransferQuestionnaireCreateRequest,
    options?: any
  ): Promise<AxiosResponse<TransferQuestionnaireCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferRecurringCancel: function (
    transferRecurringCancelRequest: TransferRecurringCancelRequest,
    options?: any
  ): Promise<AxiosResponse<TransferRecurringCancelResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferRecurringCreate: function (
    transferRecurringCreateRequest: TransferRecurringCreateRequest,
    options?: any
  ): Promise<AxiosResponse<TransferRecurringCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferRecurringGet: function (
    transferRecurringGetRequest: TransferRecurringGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransferRecurringGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferRecurringList: function (
    transferRecurringListRequest: TransferRecurringListRequest,
    options?: any
  ): Promise<AxiosResponse<TransferRecurringListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferRefundCancel: function (
    transferRefundCancelRequest: TransferRefundCancelRequest,
    options?: any
  ): Promise<AxiosResponse<TransferRefundCancelResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferRefundCreate: function (
    transferRefundCreateRequest: TransferRefundCreateRequest,
    options?: any
  ): Promise<AxiosResponse<TransferRefundCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferRefundGet: function (
    transferRefundGetRequest: TransferRefundGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransferRefundGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferRepaymentList: function (
    transferRepaymentListRequest: TransferRepaymentListRequest,
    options?: any
  ): Promise<AxiosResponse<TransferRepaymentListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferRepaymentReturnList: function (
    transferRepaymentReturnListRequest: TransferRepaymentReturnListRequest,
    options?: any
  ): Promise<AxiosResponse<TransferRepaymentReturnListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferSweepGet: function (
    transferSweepGetRequest: TransferSweepGetRequest,
    options?: any
  ): Promise<AxiosResponse<TransferSweepGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  transferSweepList: function (
    transferSweepListRequest: TransferSweepListRequest,
    options?: any
  ): Promise<AxiosResponse<TransferSweepListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  userCreate: function (
    userCreateRequest: UserCreateRequest,
    options?: any
  ): Promise<AxiosResponse<UserCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  userUpdate: function (
    userUpdateRequest: UserUpdateRequest,
    options?: any
  ): Promise<AxiosResponse<UserUpdateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  walletCreate: function (
    walletCreateRequest: WalletCreateRequest,
    options?: any
  ): Promise<AxiosResponse<WalletCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  walletGet: function (
    walletGetRequest: WalletGetRequest,
    options?: any
  ): Promise<AxiosResponse<WalletGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  walletList: function (
    walletListRequest: WalletListRequest,
    options?: any
  ): Promise<AxiosResponse<WalletListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  walletTransactionExecute: function (
    walletTransactionExecuteRequest: WalletTransactionExecuteRequest,
    options?: any
  ): Promise<AxiosResponse<WalletTransactionExecuteResponse, any>> {
    throw new Error('Function not implemented.');
  },
  walletTransactionGet: function (
    walletTransactionGetRequest: WalletTransactionGetRequest,
    options?: any
  ): Promise<AxiosResponse<WalletTransactionGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  walletTransactionList: function (
    walletTransactionListRequest: WalletTransactionListRequest,
    options?: any
  ): Promise<AxiosResponse<WalletTransactionListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningEntityCreate: function (
    watchlistScreeningEntityCreateRequest: WatchlistScreeningEntityCreateRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningEntityCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningEntityGet: function (
    watchlistScreeningEntityGetRequest: WatchlistScreeningEntityGetRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningEntityGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningEntityHistoryList: function (
    watchlistScreeningEntityHistoryListRequest: WatchlistScreeningEntityHistoryListRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningEntityHistoryListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningEntityHitList: function (
    watchlistScreeningEntityHitListRequest: WatchlistScreeningEntityHitListRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningEntityHitListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningEntityList: function (
    watchlistScreeningEntityListRequest: WatchlistScreeningEntityListRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningEntityListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningEntityProgramGet: function (
    watchlistScreeningEntityProgramGetRequest: WatchlistScreeningEntityProgramGetRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningEntityProgramGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningEntityProgramList: function (
    watchlistScreeningEntityProgramListRequest: WatchlistScreeningEntityProgramListRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningEntityProgramListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningEntityReviewCreate: function (
    watchlistScreeningEntityReviewCreateRequest: WatchlistScreeningEntityReviewCreateRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningEntityReviewCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningEntityReviewList: function (
    watchlistScreeningEntityReviewListRequest: WatchlistScreeningEntityReviewListRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningEntityReviewListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningEntityUpdate: function (
    watchlistScreeningEntityUpdateRequest: WatchlistScreeningEntityUpdateRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningEntityUpdateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningIndividualCreate: function (
    watchlistScreeningIndividualCreateRequest: WatchlistScreeningIndividualCreateRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningIndividualCreateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningIndividualGet: function (
    watchlistScreeningIndividualGetRequest: WatchlistScreeningIndividualGetRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningIndividualGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningIndividualHistoryList: function (
    watchlistScreeningIndividualHistoryListRequest: WatchlistScreeningIndividualHistoryListRequest,
    options?: any
  ): Promise<
    AxiosResponse<WatchlistScreeningIndividualHistoryListResponse, any>
  > {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningIndividualHitList: function (
    watchlistScreeningIndividualHitListRequest: WatchlistScreeningIndividualHitListRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningIndividualHitListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningIndividualList: function (
    watchlistScreeningIndividualListRequest: WatchlistScreeningIndividualListRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningIndividualListResponse, any>> {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningIndividualProgramGet: function (
    watchlistScreeningIndividualProgramGetRequest: WatchlistScreeningIndividualProgramGetRequest,
    options?: any
  ): Promise<
    AxiosResponse<WatchlistScreeningIndividualProgramGetResponse, any>
  > {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningIndividualProgramList: function (
    watchlistScreeningIndividualProgramListRequest: WatchlistScreeningIndividualProgramListRequest,
    options?: any
  ): Promise<
    AxiosResponse<WatchlistScreeningIndividualProgramListResponse, any>
  > {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningIndividualReviewCreate: function (
    watchlistScreeningIndividualReviewCreateRequest: WatchlistScreeningIndividualReviewCreateRequest,
    options?: any
  ): Promise<
    AxiosResponse<WatchlistScreeningIndividualReviewCreateResponse, any>
  > {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningIndividualReviewList: function (
    watchlistScreeningIndividualReviewListRequest: WatchlistScreeningIndividualReviewListRequest,
    options?: any
  ): Promise<
    AxiosResponse<WatchlistScreeningIndividualReviewListResponse, any>
  > {
    throw new Error('Function not implemented.');
  },
  watchlistScreeningIndividualUpdate: function (
    watchlistScreeningIndividualUpdateRequest: WatchlistScreeningIndividualUpdateRequest,
    options?: any
  ): Promise<AxiosResponse<WatchlistScreeningIndividualUpdateResponse, any>> {
    throw new Error('Function not implemented.');
  },
  webhookVerificationKeyGet: function (
    webhookVerificationKeyGetRequest: WebhookVerificationKeyGetRequest,
    options?: any
  ): Promise<AxiosResponse<WebhookVerificationKeyGetResponse, any>> {
    throw new Error('Function not implemented.');
  },
  basePath: '',
  axios: axios.create({ baseURL: 'https://test.plaid.com' }),
  configuration: undefined
});
