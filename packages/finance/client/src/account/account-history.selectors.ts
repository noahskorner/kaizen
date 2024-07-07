import { createSelector } from 'reselect';
import { AccountHistoryState } from './account-history.store';
import { getTimeframe } from './get-timeframe';
import { NetworthHistory } from './networth';
import { Timeframe } from './timeframe';
import { AccountType } from '@kaizen/finance';

export const selectAccountHistories = (state: AccountHistoryState) =>
  state.accountHistory.accountHistories;

export const createNetworthHistorySelector = (timeframe: Timeframe) =>
  createSelector(selectAccountHistories, (accountHistories) => {
    const { startDate, endDate } = getTimeframe(timeframe);

    const filtered = accountHistories.filter((accountHistory) => {
      const createdAt = new Date(accountHistory.createdAt);
      return createdAt >= startDate && createdAt <= endDate;
    });

    return filtered.reverse().reduce((groups, snapshot) => {
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
    }, new Array<NetworthHistory>());
  });

export const createNetworthHistoryByAccountTypeSelector = (
  accountType: AccountType,
  timeframe: Timeframe
) =>
  createSelector(selectAccountHistories, (accountHistories) => {
    const { startDate, endDate } = getTimeframe(timeframe);

    const filtered = accountHistories
      .filter((accountHistory) => {
        return accountHistory.type === accountType;
      })
      .filter((accountHistory) => {
        const createdAt = new Date(accountHistory.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
      });

    return filtered.reverse().reduce((groups, snapshot) => {
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
    }, new Array<NetworthHistory>());
  });
