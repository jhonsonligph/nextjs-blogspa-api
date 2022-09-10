import Image from 'next/image'
import Link from 'next/link'
import logoWhite from '../public/LOGOwhite.svg'
import { useRouter } from 'next/router'

const Footer = () => {
  const router = useRouter()
  const { query: { id }, pathname, push } = router
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  return (
    <>
      <div className="footer">
        <div className="footer-container l-container">
          <div className="footer-content">
            {pathname === '/' ? (
              <h2 className="footer-logo">
                <span>Blog</span>
              </h2>
            ) : (
              <Link href="/">
                <a>
                  <h2 className="footer-logo">
                    <span>Blog</span>
                  </h2>
                </a>
              </Link>
            )}
            <p className="footer-description">
              サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト
            </p>
            {/* <img src="./../" alt="" /> */}
          </div>
          <button className="footer-scroll-to-top" onClick={scrollToTop}>
            <span>TOP</span>
          </button>
        </div>

        <div className="footer-copyright">
          <span>Copyright©2007-2019 Blog Inc.</span>
        </div>
      </div>
    </>
  )
}

export default Footer;