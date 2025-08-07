import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div >
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