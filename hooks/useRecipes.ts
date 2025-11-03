// hooks/useRecipes.ts
export function useRecipes() {
  // Neutral "no-op"-hook så ingenting kraschar om något fortfarande importerar den.
  return {
    thisWeek: [] as any[],
    nextWeek: [] as any[],
    prior: [] as any[],
    fetchMorePrior: () => {},
    hasMore: false,
    loading: false,
  };
}
