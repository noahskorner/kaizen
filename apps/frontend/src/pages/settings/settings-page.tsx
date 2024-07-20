import { UpdateEmailForm, UpdatePasswordForm } from '@kaizen/user-client';

export const SettingsPage = () => {
  return (
    <div className="flex w-full flex-col gap-y-6">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Settings
      </h1>
      <div className="flex w-full max-w-2xl flex-col gap-y-8">
        <UpdateEmailForm />
        <UpdatePasswordForm />
      </div>
    </div>
  );
};
