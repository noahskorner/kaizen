import { VirtualAccountFrequency } from '@kaizen/finance';

export const FREQUENCY_BUTTONS = [
  {
    children: VirtualAccountFrequency.Weekly,
    value: VirtualAccountFrequency.Weekly
  },
  {
    children: VirtualAccountFrequency.Biweekly,
    value: VirtualAccountFrequency.Biweekly
  },
  {
    children: VirtualAccountFrequency.Monthly,
    value: VirtualAccountFrequency.Monthly
  }
];
