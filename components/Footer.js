import Image from 'next/image'
import Link from 'next/link'
import logoWhite from '../public/LOGOwhite.svg'

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-container l-container">
          <div className="footer-content">
            {/* <router-link to="/"> */}
            <Link href="/">
              <a>
                <h2 className="footer-logo">
                  <span>Blog</span>
                </h2>
              </a>
            </Link>

            <p className="footer-description">
              サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト
            </p>
            <img src="./../" alt="" />
          </div>
          <button className="footer-scroll-to-top">
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