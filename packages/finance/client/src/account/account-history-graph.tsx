import { AccountSnapshot } from '@kaizen/finance';
import { useEffect, useState } from 'react';
import { FindAccountHistoryClient } from './find-account-history.client';
import { LineGraph } from '@kaizen/core-client';

export const AccountHistoryGraph = () => {
  const [accountSnapshots, setAccountSnapshots] = useState<AccountSnapshot[]>(
    []
  );

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
      setAccountSnapshots(findAccountSnapshotsResponse.data.hits);
    };

    loadAccountSnapshots();
  }, []);

  return (
    <>
      <LineGraph
        data={accountSnapshots.map((x) => {
          return { date: x.createdAt, value: x.available ?? 0 };
        })}
        width={500}
        height={500}></LineGraph>
    </>
  );
};
