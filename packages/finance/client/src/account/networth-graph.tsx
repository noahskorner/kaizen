import { useMemo, useState } from 'react';
import { LineChart } from '@kaizen/core-client';
import { selectNetworth } from '../institution';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../format-currency';
import { Timeframe } from './timeframe';
import { createNetworthHistorySelector } from './account-history.selectors';
import { NetworthHistory } from './networth';

const DEFAULT_TIMEFRAME = '1M';

const TIMEFRAMES = ['1W', '1M', '3M', 'YTD', 'ALL'];

export const NetworthGraph = () => {
  const [currentTimeframe, setCurrentTimeframe] =
    useState<Timeframe>(DEFAULT_TIMEFRAME);
  const networth = useSelector(selectNetworth);
  const networthHistorySelector = useMemo(() => {
    return createNetworthHistorySelector(currentTimeframe);
  }, [currentTimeframe]);
  const networthHistory = useSelector(networthHistorySelector);

  const percentChange = useMemo(() => {
    return calculatePercentChange(networthHistory);
  }, [networthHistory]);

  const difference = useMemo(() => {
    return calculateDifference(networthHistory);
  }, [networthHistory]);

  const positive = difference >= 0;

  const onTimeframeClick = (timeframe: Timeframe) => {
    setCurrentTimeframe(timeframe);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg p-4 text-white">
      <div>
        <h2 className="mb-1 text-4xl font-bold">
          {formatCurrency(networth, 'USD')}
        </h2>
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
      <div className="mt-4 flex w-full items-center justify-start gap-x-4 border-b border-neutral-500 pb-4">
        {TIMEFRAMES.map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => onTimeframeClick(timeframe as Timeframe)}
            className={`${currentTimeframe === timeframe ? `${positive ? ' bg-green-700 text-neutral-50' : 'bg-red-700 text-neutral-50'} rounded-lg px-2 py-1` : ''} text-xs font-semibold hover:text-neutral-200`}>
            {timeframe}
          </button>
        ))}
      </div>
    </div>
  );
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
