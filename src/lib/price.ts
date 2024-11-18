import { formatUnits } from 'viem';

export const formatUSD = (amount: number) => {
  return amount.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const formatTokenAmount = (amount: bigint, decimals: number = 9) => {
  return Number(formatUnits(amount, decimals)).toLocaleString(undefined, {
    maximumFractionDigits: 0
  });
};

// Calculate USD value with fallback
export const calculateUSDValue = (tokenAmount: bigint, price: number, decimals: number = 9) => {
  const amount = Number(formatUnits(tokenAmount, decimals));
  return formatUSD(amount * (price || 0));
};