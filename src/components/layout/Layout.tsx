import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='gradientbg'>
      <main >
        <div >
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout