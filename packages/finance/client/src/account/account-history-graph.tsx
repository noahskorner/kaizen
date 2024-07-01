import { useEffect, useState } from 'react';
import { FindAccountHistoryClient } from './find-account-history.client';
import { LineChart } from '@kaizen/core-client';

interface AccountHistory {
  snapshotId: string;
  date: string;
  total: number;
}

export const AccountHistoryGraph = () => {
  const [accountHistory, setAccountHistory] = useState<AccountHistory[]>([]);

  useEffect(() => {
    const loadAccountSnapshots = async () => {
      // TODO: Need to do this in a batch depending on timeframe selected
      const findAccountSnapshotsResponse = await FindAccountHistoryClient.find({
        page: 1,
        pageSize: 25,
        startDate: new Date(1998, 7, 30).toISOString(),
        endDate: new Date(2050, 7, 30).toISOString()
      });

      console.log(findAccountSnapshotsResponse);

      if (findAccountSnapshotsResponse.type === 'FAILURE') {
        // Handle error
        return;
      }

      setAccountHistory(
        findAccountSnapshotsResponse.data.hits
          .reverse()
          .reduce((groups, snapshot) => {
            const { snapshotId, createdAt, available } = snapshot;
            const existingGroup = groups.find(
              (group) => group.snapshotId === snapshotId
            );
            if (existingGroup) {
              existingGroup.total += available ?? 0;
            } else {
              groups.push({
                snapshotId,
                date: createdAt,
                total: available ?? 0
              });
            }
            return groups;
          }, new Array<AccountHistory>())
      );
    };

    loadAccountSnapshots();
  }, []);

  return (
    <LineChart
      data={accountHistory.map((x) => {
        return { date: x.date, value: x.total };
      })}
    />
  );
};
