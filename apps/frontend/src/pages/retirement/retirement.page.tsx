import { formatCurrency } from '@kaizen/core-client';
import { useMemo } from 'react';

export const RetirementPage = () => {
  const retirementData = useMemo(() => {
    return calculateRetirementData(26, 65, 40000, 1100, 0.07);
  }, []);

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="sticky top-0 flex w-full justify-between border-b border-zinc-800 bg-zinc-950 bg-opacity-60 p-2 backdrop-blur-md">
          <span className="w-full text-left text-xs text-zinc-300">Year</span>
          <span className="w-full text-left text-xs text-zinc-300">Age</span>
          <span className="w-full text-left text-xs text-zinc-300">
            Total contribution
          </span>
          <span className="w-full text-left text-xs text-zinc-300">
            Total interest earned
          </span>
          <span className="w-full text-right text-xs text-zinc-300">
            End balance
          </span>
        </div>
        {retirementData.map((retirement) => {
          return (
            <div
              key={retirement.year}
              className="flex w-full items-center justify-between border-b border-zinc-800 p-2 hover:bg-zinc-900">
              <span className="w-full text-left text-sm text-zinc-50">
                {retirement.year}
              </span>
              <span className="w-full text-left text-sm text-zinc-50">
                {retirement.age}
              </span>
              <span className="w-full text-left text-sm text-zinc-50">
                {formatCurrency(retirement.totalContribution, 'USD')}
              </span>
              <span className="w-full text-left text-sm text-zinc-50">
                {formatCurrency(retirement.totalInterestEarned, 'USD')}
              </span>
              <span className="w-full text-right text-sm text-zinc-50">
                {formatCurrency(retirement.endBalance, 'USD')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface Retirement {
  year: number;
  age: number;
  totalContribution: number;
  totalInterestEarned: number;
  endBalance: number;
}

const calculateRetirementData = (
  startAge: number,
  endAge: number,
  startingAmount: number,
  monthlyContribution: number,
  annualInterestRate: number
): Retirement[] => {
  const monthlyInterestRate = annualInterestRate / 12;
  const retirementData: Retirement[] = [];

  for (let age = startAge + 1; age <= endAge; age++) {
    const years = age - startAge;
    const months = years * 12;

    // Future Value of Monthly Contributions
    const futureValueContributions =
      monthlyContribution *
      ((Math.pow(1 + monthlyInterestRate, months) - 1) / monthlyInterestRate);

    // Future Value of the Starting Amount
    const futureValueStartingAmount =
      startingAmount * Math.pow(1 + monthlyInterestRate, months);

    // Total Future Value
    const endBalance = futureValueStartingAmount + futureValueContributions;

    // Total Contribution
    const totalContribution = startingAmount + monthlyContribution * months;

    // Total Interest Earned
    const totalInterestEarned = endBalance - totalContribution;

    retirementData.push({
      year: new Date().getFullYear() + years,
      age: age,
      totalContribution: totalContribution,
      totalInterestEarned: totalInterestEarned,
      endBalance: endBalance
    });
  }

  return retirementData;
};
