import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
    <div>
        <Header />
          <Outlet/>
        <Footer />
    </div>
  )
}
