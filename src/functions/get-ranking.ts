import { eq, inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

export async function getRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')
  const subscriptionIdAndScore: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i += 2) {
    subscriptionIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribes = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriptionIdAndScore)))

  const rankingWithScore = subscribes
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriptionIdAndScore[subscriber.id],
      }
    })
    .sort((a, b) => {
      return b.score - a.score
    })

  return { rankingWithScore }
}
