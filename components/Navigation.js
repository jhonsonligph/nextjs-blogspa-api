import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'


const Navigation = () => {
  const router = useRouter()
  const { query: { id }, pathname } = router

  useEffect(() => {
    console.log(pathname)
  }, [])



  return (
    <>
      <nav className="navigation">
        <ul className="navigation-list l-container">
          <li className="navigation-item">
            <Link href="/">
              <a>
                <h1 className="navigation-home">
                  <span>Blog</span>
                  {/* <img src="../assets/images/LOGO.svg"> */}
                </h1>
              </a>
            </Link>
          </li>
          <li className="navigation-item">
            {/* {router.pathname === '/news/create' ? 'New Post' : 'Unknown'} */}
            {/* {router.pathname === '/news/[id]' ? 'New Post' : 'Unknown'} */}
            {router.pathname === '/news/edit/[id]' ? 'Edit Post' : 'Unknown'}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;