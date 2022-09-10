import { useContext } from 'react';
import { useRouter } from 'next/router'
import { AuthContext } from '../context/auth'

const AuthRoute = ({ children }) => {
  const { auth } = useContext(AuthContext)
  const { push } = router = useRouter()
  return auth ? (push('/')) : children
}

export default AuthRoute