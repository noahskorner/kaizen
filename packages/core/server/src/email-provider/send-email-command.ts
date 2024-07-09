export interface SendEmailCommand {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
