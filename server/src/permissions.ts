
import { rule, and, shield } from 'graphql-shield'
import { getUserId } from './utils'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isPostOwner: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context)
    const author = await context.prisma
      .post({
        id,
      })
      .author()
    return userId === author.id
  }),
}

export const permissions = shield({
  Query: {
    user: rules.isAuthenticatedUser,
    // filterPosts: rules.isAuthenticatedUser,
    // post: rules.isAuthenticatedUser,
  },
  // Mutation: {
  //   // createDraft: rules.isAuthenticatedUser,
  //   // deletePost: rules.isPostOwner,
  //   // publish: rules.isPostOwner,
  // },
})
