import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth'

const Navigation = () => {
  const { auth, open, login, logout, isLoggedIn, isOpen } = useContext(AuthContext)
  const context = useContext(AuthContext)
  const router = useRouter()
  const { pathname, push } = router
  const isLoginRegister = () => isOpen()
  const logOutUser = () => {
    logout()
    push('/')
  }

  function logInUser() {
    push({
      pathname: '/',
      query: { logUser: true }
    }, '/')
  }
  // TODO: LOGOUT private routes
  useEffect(() => {
    // console.clear()
    console.log('LOCATION:', pathname)
    console.log('CONTEXT:', context)
  })

  return (
    <>
      <nav className="navigation">
        <ul className="navigation-list l-container">
          <li className="navigation-item">
            {pathname === '/' ? (
              <h1 className="navigation-home">
                <span>Blog</span>
                {/* <img src="../assets/images/LOGO.svg"> */}
              </h1>
            ) : (
              <Link href="/">
                <a>
                  <h1 className="navigation-home">
                    <span>Blog</span>
                    {/* <img src="../assets/images/LOGO.svg"> */}
                  </h1>
                </a>
              </Link>
            )}
          </li>
          <li className="navigation-item">
            {(() => {
              const routes = pathname === '/news/[id]' || pathname === '/news/edit/[id]' || pathname === '/news/create'
              if (auth) {
                if (pathname === '/' || routes) {
                  return (
                    <button onClick={logOutUser}>
                      <span>logout</span>
                    </button>
                  )
                }
              } else {
                if (pathname === '/') {
                  return (
                    <button onClick={isLoginRegister}>
                      <span>{open ? 'close' : 'login'}</span>
                    </button>
                  )
                } else if (routes) {
                  return (
                    <button onClick={logInUser}>
                      <span>login</span>
                    </button>
                  )
                } else {
                  return ('Redirecting...')
                }
              }
            })()}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;