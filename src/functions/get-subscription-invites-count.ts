import { redis } from '../redis/client'

interface GetSubscriptionInvitesCountParams {
  subscriptionId: string
}

export async function getSubscriptionInvitesCount({
  subscriptionId,
}: GetSubscriptionInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subscriptionId)

  return { count: count ? Number.parseInt(count) : 0 }
}
