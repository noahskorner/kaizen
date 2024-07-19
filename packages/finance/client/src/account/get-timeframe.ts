import { Timeframe } from './timeframe';

export const getTimeframe = (timeframe: Timeframe) => {
  const currentDate = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (timeframe) {
    case '1W':
      startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      endDate = currentDate;
      break;
    case '1M':
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      );
      endDate = currentDate;
      break;
    case '3M':
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 3,
        currentDate.getDate()
      );
      endDate = currentDate;
      break;
    case 'YTD':
      startDate = new Date(currentDate.getFullYear(), 0, 1);
      endDate = currentDate;
      break;
    case 'ALL':
      startDate = new Date(0);
      endDate = currentDate;
      break;
    default:
      startDate = new Date();
      endDate = new Date();
      break;
  }

  return { startDate: startDate, endDate: endDate };
};
