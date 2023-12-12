export interface CurrentMonthAndYear {
  month: string;
  year: number;
}

export const getCurrentMonthAndYear = (): CurrentMonthAndYear => {
  const currentDate = new Date();
  const currentMonth = new Intl.DateTimeFormat('en-US', {
    month: 'long'
  }).format(currentDate);
  const currentYear = parseInt(currentDate.getFullYear().toString().slice(-2));

  return { month: currentMonth, year: currentYear };
};
