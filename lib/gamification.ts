export const TIERS = [
  { name: "Iron", minExp: 0, color: "text-slate-500", bg: "bg-slate-100" },
  { name: "Bronze", minExp: 500, color: "text-amber-700", bg: "bg-amber-100" },
  { name: "Silver", minExp: 1500, color: "text-slate-400", bg: "bg-slate-100" },
  { name: "Gold", minExp: 3000, color: "text-yellow-500", bg: "bg-yellow-100" },
  { name: "Platinum", minExp: 5000, color: "text-emerald-500", bg: "bg-emerald-100" },
  { name: "Emerald", minExp: 8000, color: "text-green-500", bg: "bg-green-100" },
  { name: "Diamond", minExp: 12000, color: "text-blue-500", bg: "bg-blue-100" },
  { name: "Master", minExp: 20000, color: "text-purple-500", bg: "bg-purple-100" },
  { name: "Grandmaster", minExp: 35000, color: "text-red-500", bg: "bg-red-100" },
  { name: "Challenger", minExp: 50000, color: "text-cyan-400", bg: "bg-cyan-100" },
];

export function getTierInfo(exp: number) {
  let currentTier = TIERS[0];
  let nextTier = TIERS[1];

  for (let i = 0; i < TIERS.length; i++) {
    if (exp >= TIERS[i].minExp) {
      currentTier = TIERS[i];
      nextTier = TIERS[i + 1] || TIERS[i]; // Challenger의 다음 티어는 없음
    } else {
      break;
    }
  }

  const progress = nextTier.name === currentTier.name 
    ? 100 
    : Math.min(100, Math.max(0, ((exp - currentTier.minExp) / (nextTier.minExp - currentTier.minExp)) * 100));

  return {
    currentTier,
    nextTier,
    progress,
    expToNext: nextTier.name === currentTier.name ? 0 : nextTier.minExp - exp
  };
}
