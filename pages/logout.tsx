import redirect from '../apollo/redirect';
import { useLogoutMutation } from '../components/Graphql';

const Logout = () => {
  const [logout] = useLogoutMutation();
  logout();
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }) => {
  await apolloClient?.resetStore();
  redirect(ctx, '/login');
  return {};
};

export default Logout;
