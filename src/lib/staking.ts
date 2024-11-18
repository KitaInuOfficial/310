export function calculateAPY(amount: number, apy: number): number {
  return (amount * apy) / 100;
}

export function calculateRewards(amount: number, apy: number, days: number): number {
  const yearlyReward = calculateAPY(amount, apy);
  return (yearlyReward * days) / 365;
}