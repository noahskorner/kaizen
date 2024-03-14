export enum AccountVerificationStatus {
  AutomaticallyVerified = 'automatically_verified',
  PendingAutomaticVerification = 'pending_automatic_verification',
  PendingManualVerification = 'pending_manual_verification',
  ManuallyVerified = 'manually_verified',
  VerificationExpired = 'verification_expired',
  VerificationFailed = 'verification_failed',
  DatabaseMatched = 'database_matched'
}
