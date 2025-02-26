import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriptionInviteClicks } from '../functions/get-subscription-invite-clicks'

export const getSubscriptionInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscription/:subscriptionId/ranking/clicks',
      {
        schema: {
          summary: 'Get subscription ranking invite clicks count',
          tags: ['referral'],
          params: z.object({
            subscriptionId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async (req, res) => {
        const { subscriptionId } = req.params

        const { count } = await getSubscriptionInviteClicks({ subscriptionId })

        return res.send({ count })
      }
    )
  }
