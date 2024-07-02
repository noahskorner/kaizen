import { useEffect, useMemo, useState } from 'react';
import { FindAccountHistoryClient } from './find-account-history.client';
import { LineChart } from '@kaizen/core-client';
import { selectNetworth } from '../institution';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../format-currency';

const DEFAULT_TIMEFRAME = '1M';

interface NetworthHistory {
  snapshotId: string;
  date: string;
  value: number;
}

type Timeframe = '1W' | '1M' | '3M' | 'YTD' | 'ALL';
const TIMEFRAMES = ['1W', '1M', '3M', 'YTD', 'ALL'];

export const AccountHistoryGraph = () => {
  const [currentTimeframe, setCurrentTimeframe] =
    useState<Timeframe>(DEFAULT_TIMEFRAME);
  const [networthHistory, setNetworthHistory] = useState<NetworthHistory[]>([]);
  const networth = useSelector(selectNetworth);

  const percentChange = useMemo(() => {
    return calculatePercentChange(networthHistory);
  }, [networthHistory]);

  const difference = useMemo(() => {
    return calculateDifference(networthHistory);
  }, [networthHistory]);

  const positive = difference > 0;

  const loadNetworthHistory = async (timeframe: Timeframe) => {
    const { startDate, endDate } = getTimeframe(timeframe);

    const findAccountSnapshotsResponse = await FindAccountHistoryClient.find({
      page: 1,
      pageSize: 250000,
      startDate: startDate,
      endDate: endDate
    });

    if (findAccountSnapshotsResponse.type === 'FAILURE') {
      // TODO: Handle error
      return;
    }

    setNetworthHistory(
      findAccountSnapshotsResponse.data.hits
        .reverse()
        .reduce((groups, snapshot) => {
          const { snapshotId, createdAt, available } = snapshot;
          const existingGroup = groups.find(
            (group) => group.snapshotId === snapshotId
          );
          if (existingGroup) {
            existingGroup.value += available ?? 0;
          } else {
            groups.push({
              snapshotId,
              date: createdAt,
              value: available ?? 0
            });
          }
          return groups;
        }, new Array<NetworthHistory>())
    );
  };

  const onTimeframeClick = (timeframe: Timeframe) => {
    setCurrentTimeframe(timeframe);
  };

  useEffect(() => {
    loadNetworthHistory(currentTimeframe);
  }, [currentTimeframe]);

  return (
    <div className="flex h-full w-full flex-col rounded-lg p-4 text-white">
      <div>
        <h2 className="mb-1 text-2xl font-bold">NETWORTH</h2>
        <p className="mb-1 text-4xl font-bold">
          {formatCurrency(networth, 'USD')}
        </p>
        <div className="mb-4 flex items-center">
          <span
            className={`${positive ? 'text-green-500' : 'text-red-500'} mr-4`}>
            {positive ? '+' : '-'}
            {formatCurrency(Math.abs(difference), 'USD')} (
            {positive ? '+' : '-'}${Math.abs(percentChange)}%)&nbsp;
            {getLabel(currentTimeframe)}
          </span>
        </div>
      </div>
      <LineChart
        stroke={`${positive ? '#22c55e' : '#ef4444'}`}
        data={networthHistory}
      />
      <div className="mt-4 flex w-full items-start justify-start gap-x-4 border-b border-neutral-500 pb-4">
        {TIMEFRAMES.map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => onTimeframeClick(timeframe as Timeframe)}
            className={`${currentTimeframe === timeframe ? `${positive ? ' border-green-500 text-green-500' : 'border-red-500 text-red-500'} border-b-2` : ''} font-bold hover:text-neutral-200`}>
            {timeframe}
          </button>
        ))}
      </div>
    </div>
  );
};

const getTimeframe = (timeframe: Timeframe) => {
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

  return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
};

const calculatePercentChange = (networthHistory: NetworthHistory[]) => {
  if (networthHistory.length < 2) {
    return 0;
  }

  const startValue = networthHistory[0].value;
  const endValue = networthHistory[networthHistory.length - 1].value;
  const change = endValue - startValue;
  const percentChange = (change / Math.abs(startValue)) * 100;

  return parseFloat(percentChange.toFixed(2));
};

const calculateDifference = (networthHistory: NetworthHistory[]) => {
  return networthHistory.length < 1
    ? 0
    : networthHistory[networthHistory.length - 1].value -
        networthHistory[0].value;
};

const getLabel = (timeframe: Timeframe) => {
  switch (timeframe) {
    case '1W':
      return 'Last week';
    case '1M':
      return 'Last month';
    case '3M':
      return 'Last 3 months';
    case 'YTD':
      return 'Year-to-date';
    case 'ALL':
      return 'All time';
    default:
      return '';
  }
};
