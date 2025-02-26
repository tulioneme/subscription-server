import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriptionRankingPosition } from '../functions/get-subscription-ranking-position'

export const getSubscriptionRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscription/:subscriptionId/ranking/position',
      {
        schema: {
          summary: 'Get subscription ranking position',
          tags: ['referral'],
          params: z.object({
            subscriptionId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async (req, res) => {
        const { subscriptionId } = req.params

        const { position } = await getSubscriptionRankingPosition({
          subscriptionId,
        })

        return res.send({ position })
      }
    )
  }
