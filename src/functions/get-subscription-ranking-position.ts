import { redis } from '../redis/client'

interface GetSubscriptionRankingPositionParams {
  subscriptionId: string
}

export async function getSubscriptionRankingPosition({
  subscriptionId,
}: GetSubscriptionRankingPositionParams) {
  // get position at rank if exist
  const position = await redis.zrevrank('referral:ranking', subscriptionId)

  return { position: position === null ? null : position + 1 }
}
