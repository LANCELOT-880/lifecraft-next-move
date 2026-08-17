import { useSyncExternalStore } from "react";
import { getRewardProgress, rewardStore, type RewardProgress } from "./rewards";

export function useRewards(): RewardProgress {
  const state = useSyncExternalStore(
    rewardStore.subscribe,
    rewardStore.getSnapshot,
    rewardStore.getServerSnapshot,
  );
  return getRewardProgress(state);
}
