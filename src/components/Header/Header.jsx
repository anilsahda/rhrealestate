import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { Edit } from 'lucide-react'
import logo from '../../assets/images/logo/bhuvi-logo.webp'
import BrochurePopup from '../BrochurePopup/BrochurePopup'
import ProjectPopup from '../ProjectPopup/ProjectPopup'

const NAV_LINKS = [
  { label: 'Home', to: 'home', isHash: false },
  { label: 'About Us', to: 'about', isHash: true },
  { label: 'Floor Plans', to: 'floor-plans', isHash: true },
  { label: 'Amenities', to: 'amenities', isHash: true },
]

const Header = ({ projectData, onProjectUpdate }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [brochureOpen, setBrochureOpen] = useState(false)
  const [projectPopupOpen, setProjectPopupOpen] = useState(false)

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Logo ── */}
            <div className="flex-shrink-0 flex items-center gap-2">
              {projectData?.name && (
                <span className="text-sm md:text-base font-semibold text-gray-800 leading-tight">
                  {projectData.name}
                </span>
              )}
              <a
                href="/"
                className="flex items-center"
                aria-label="Go to homepage"
              >
                <img
                  src={projectData?.logo ? (projectData.logo.startsWith('http') || projectData.logo.startsWith('data') ? projectData.logo : `https://localhost:7104${projectData.logo}`) : logo}
                  alt="Vasavi Bhuvi Logo"
                  className="h-10 md:h-14 w-auto object-contain"
                  onError={(e) => { e.target.src = logo; }}
                />
              </a>
              <button
                onClick={() => setProjectPopupOpen(true)}
                className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                title="Edit Project"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map(({ label, to, isHash }) =>
                isHash ? (
                  <Link
                    key={to}
                    to={to}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={600}
                    activeClass="text-amber-600 font-semibold"
                    className="relative px-3 py-2 text-sm font-medium text-gray-700 rounded-md
                               hover:text-amber-600 hover:bg-amber-50
                               transition-all duration-200 cursor-pointer
                               after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                               after:h-0.5 after:w-0 after:bg-amber-500
                               after:transition-all after:duration-300
                               hover:after:w-4/5"
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    key={to}
                    href="/"
                    className="relative px-3 py-2 text-sm font-medium text-gray-700 rounded-md
                               hover:text-amber-600 hover:bg-amber-50
                               transition-all duration-200 cursor-pointer"
                  >
                    {label}
                  </a>
                )
              )}

              {/* CTA Button */}
              <button
                id="download-brochure-btn-desktop"
                onClick={() => setBrochureOpen(true)}
                className="ml-4 px-5 py-2.5 text-sm font-semibold text-white rounded-lg
                           bg-gradient-to-r from-amber-500 to-yellow-400
                           hover:from-amber-600 hover:to-yellow-500
                           shadow-md hover:shadow-amber-200 hover:shadow-lg
                           transform hover:-translate-y-0.5
                           transition-all duration-200 cursor-pointer
                           tracking-wide"
              >
                Download Brochure
              </button>
            </nav>

            {/* ── Mobile right: CTA + Hamburger ── */}
            <div className="flex md:hidden items-center gap-2">
              <button
                id="download-brochure-btn-mobile"
                onClick={() => setBrochureOpen(true)}
                className="px-3 py-2 text-xs font-semibold text-white rounded-lg
                           bg-gradient-to-r from-amber-500 to-yellow-400
                           hover:from-amber-600 hover:to-yellow-500
                           shadow-md transition-all duration-200 cursor-pointer
                           tracking-wide whitespace-nowrap"
              >
                Brochure
              </button>

              <button
                id="hamburger-menu-btn"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="p-2 rounded-lg text-gray-600 hover:text-amber-600 hover:bg-amber-50
                           transition-colors duration-200 cursor-pointer"
              >
                <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
                {menuOpen ? (
                  /* X icon */
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  /* Hamburger icon */
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu Drawer ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="bg-white border-t border-gray-100 px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ label, to, isHash }) =>
              isHash ? (
                <Link
                  key={to}
                  to={to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={600}
                  activeClass="text-amber-600 bg-amber-50 font-semibold"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700
                             rounded-lg hover:text-amber-600 hover:bg-amber-50
                             transition-all duration-200 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  {label}
                </Link>
              ) : (
                <a
                  key={to}
                  href="/"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700
                             rounded-lg hover:text-amber-600 hover:bg-amber-50
                             transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  {label}
                </a>
              )
            )}
          </nav>
        </div>
      </header>

      {/* Brochure Popup */}
      <BrochurePopup isOpen={brochureOpen} onClose={() => setBrochureOpen(false)} />

      {/* Project Edit Popup */}
      <ProjectPopup 
        isOpen={projectPopupOpen} 
        onClose={() => setProjectPopupOpen(false)} 
        projectData={projectData} 
        onSave={onProjectUpdate} 
      />
    </>
  )
}

export default Header
