import redirect from '../apollo/redirect'

const Logout = () => {
  return null
}

Logout.getInitialProps = async ({ apolloClient, ...ctx }) => {
  await apolloClient?.resetStore()
  redirect(ctx, '/login')
  return {}
}

export default Logout
