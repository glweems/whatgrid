// import { MyContext } from '../interfaces/MyContext';
import redirect from '../apollo/redirect';
import { LogoutDocument, useLogoutMutation } from '../components/Graphql';

const Logout = () => {
  const [logout] = useLogoutMutation();
  // logout();
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }) => {
  await console.log('TCL: Logout.getInitialProps -> apolloClient', apolloClient);
  await apolloClient?.resetStore();
  redirect(ctx, '/login');
  return {};
};

export default Logout;
