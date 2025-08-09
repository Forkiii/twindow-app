import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  return (
    <div className='gradientbg'>
      <main >
        <div >
        <Header/>

          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout