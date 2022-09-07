import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="l-container">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout