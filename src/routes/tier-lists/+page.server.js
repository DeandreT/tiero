import { getTierListSummaries } from "$lib/tiers/tiers";


export async function load() {
  const tierLists = await getTierListSummaries();
  return { success: true, tierLists };
}