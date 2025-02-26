import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscribe',
    {
      schema: {
        summary: 'subscribe someone to the event',
        tags: ['subscribe'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriptionId: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { name, email, referrer } = req.body

      const { subscriptionId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer,
      })

      return res.status(201).send({
        subscriptionId,
      })
    }
  )
}
