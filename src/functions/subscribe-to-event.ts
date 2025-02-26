import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId?: string | null
}

export async function subscribeToEvent({
  name,
  email,
  referrerId,
}: SubscribeToEventParams): Promise<{ subscriptionId: string }> {
  const registrations = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  if (registrations.length > 0) {
    return { subscriptionId: registrations[0].id }
  }

  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  if (referrerId) {
    // sorted sets
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  const subscription = result[0]

  return {
    subscriptionId: subscription.id,
  }
}
