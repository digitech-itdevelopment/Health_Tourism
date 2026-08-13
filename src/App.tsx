import { useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { useReveal } from './lib/motion'
import Home from './pages/Home'
import Directory from './pages/Directory'
import HospitalProfile from './pages/HospitalProfile'
import Treatment from './pages/Treatment'
import WhyIndia from './pages/WhyIndia'
import Journey from './pages/Journey'
import About from './pages/About'
import NotFound from './pages/NotFound'

function Layout() {
  const { pathname } = useLocation()
  useReveal()

  // Route changes reset scroll; in-page anchors (#enquire) manage their own.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="overflow-x-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hospitals" element={<Directory />} />
        <Route path="hospitals/:slug" element={<HospitalProfile />} />
        <Route path="treatments/knee-replacement" element={<Treatment />} />
        <Route path="why-india" element={<WhyIndia />} />
        <Route path="your-journey" element={<Journey />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
