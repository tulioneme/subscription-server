import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriptionId',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['referral'],
        params: z.object({
          subscriptionId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (req, res) => {
      const { subscriptionId } = req.params

      await accessInviteLink({ subscriptionId })

      const redirectURL = new URL(env.WEB_URL)

      redirectURL.searchParams.set('referrer', subscriptionId)

      return res.redirect(redirectURL.toString(), 302)
    }
  )
}
