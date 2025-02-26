import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriptionInvitesCount } from '../functions/get-subscription-invites-count'

export const getSubscriptionInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscription/:subscriptionId/ranking/count',
      {
        schema: {
          summary: 'Get subscription ranking invites count',
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

        const { count } = await getSubscriptionInvitesCount({ subscriptionId })

        return res.send({ count })
      }
    )
  }
