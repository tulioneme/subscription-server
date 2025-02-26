import { redis } from '../redis/client'

interface AccessInviteLinkParams {
  subscriptionId: string
}

export async function accessInviteLink({
  subscriptionId,
}: AccessInviteLinkParams) {
  await redis.hincrby('referral:access-count', subscriptionId, 1)
}
