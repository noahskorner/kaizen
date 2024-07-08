export const SettingsPage = () => {
  return (
    <div className="flex w-full flex-col gap-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="flex w-full max-w-2xl flex-col gap-y-8">
        <div className="flex w-full flex-col gap-y-4 rounded-lg border border-neutral-500 bg-neutral-700">
          <h3 className="px-6 pt-6 text-xl font-bold">Email</h3>
          <div className="flex flex-col gap-y-4 px-6 pb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-neutral-50">
              Enter the email address you want to use to log in.
            </label>
            <input
              type="email"
              id="email"
              className="block w-full rounded-lg border border-neutral-500 bg-neutral-900 p-2.5 text-sm text-neutral-50 focus:border-blue-500 focus:ring-blue-500 "
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="flex flex-col items-end justify-center border-t border-neutral-500 px-6 py-4">
            <button
              type="button"
              className="focus rounded-lg bg-neutral-50 px-3 py-2 text-center text-sm font-medium text-neutral-950 focus:outline-none focus:ring-4">
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
