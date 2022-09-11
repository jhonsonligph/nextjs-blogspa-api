import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from '../context/auth'

const withAuth = Component => {


  const Auth = props => {
    const { auth } = useContext(AuthContext)
    const { push } = useRouter()


    // If user is not logged in, return login component
    if (!auth) {
      push('/')
    }

    // If user is logged in, return original component
    return (
      <Component {...props} />
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;