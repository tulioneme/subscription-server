import { redis } from '../redis/client'

interface GetSubscriptionInviteClicksParams {
  subscriptionId: string
}

export async function getSubscriptionInviteClicks({
  subscriptionId,
}: GetSubscriptionInviteClicksParams) {
  const count = await redis.hget('referral:access-count', subscriptionId)

  return { count: count ? Number.parseInt(count) : 0 }
}
