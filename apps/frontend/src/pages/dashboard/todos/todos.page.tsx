export const TodosPage = () => {
  return (
    <div className="justify-betwee flex h-full w-full gap-x-2">
      <div className="flex w-full flex-col gap-y-2 rounded-lg border border-neutral-100 bg-neutral-50 p-3">
        <h6 className="w-full border-b border-neutral-100 bg-transparent font-medium">
          Todo
        </h6>
        <div className="h-64 w-full cursor-pointer rounded-lg border-neutral-100 bg-white shadow-sm"></div>
      </div>
      <div className="w-full rounded-lg border border-neutral-100 bg-neutral-50"></div>
      <div className="w-full rounded-lg border border-neutral-100 bg-neutral-50"></div>
      <div className="w-full rounded-lg border border-neutral-100 bg-neutral-50"></div>
      <div className="w-full rounded-lg border border-neutral-100 bg-neutral-50"></div>
    </div>
  );
};
