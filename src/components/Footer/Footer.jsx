import { Link } from 'react-scroll'
import bhuviLogo from '../../assets/images/banner/imgi_1_bhuvi-logo.webp'

const FOOTER_LINKS = [
  { label: 'Home', to: 'home' },
  { label: 'About us', to: 'about' },
  { label: 'Floor Plans', to: 'floor-plans' },
  { label: 'Amenities', to: 'amenities' },
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms And Conditions', to: '#' }
]

const Footer = () => {
  return (
    <footer className="w-full">
      {/* ── Top Section (Light) ── */}
      <div className="bg-[#f4f6f9] py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Main Columns Layout */}
          <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16 mb-12">
            
            {/* Col 1: Logo & Tagline (Takes up more space) */}
            <div className="flex flex-col lg:w-3/5 xl:w-[55%]">
              <div className="mb-6 w-[200px]">
                <img src={bhuviLogo} alt="Vasavi Bhuvi Logo" className="w-full h-auto object-contain" />
              </div>
              <p className="text-[#333333] text-[15px] leading-[1.8]">
                Vasavi Group is a leading real estate developer in Hyderabad that strives for quality and
                perfection to provide you with the most luxurious and affordable residential and commercial
                projects.
              </p>
            </div>

            {/* Col 2 & 3 wrapper for spacing */}
            <div className="flex flex-col sm:flex-row gap-16 lg:w-2/5 xl:w-[45%] lg:justify-end lg:pr-20">
              {/* Col 2: Navigation Links */}
              <div className="flex flex-col">
                <ul className="space-y-3.5">
                  {FOOTER_LINKS.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.to}
                        spy={true}
                        smooth={true}
                        offset={-80}
                        duration={600}
                        className="text-[#333333] text-[14px] hover:text-amber-600 transition-colors cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3: Contact Info */}
              <div className="flex flex-col">
                <h4 className="text-[#333333] text-[14px] mb-3">Contact Us</h4>
                <a 
                  href="tel:+919996899921" 
                  className="text-[#0056b3] text-[16px] font-bold hover:text-blue-800 transition-colors mb-6 inline-block"
                >
                  +91 99968 99921
                </a>

                <h4 className="text-[#333333] text-[14px] mb-2">RERA NO:</h4>
                <p className="text-[#102a63] text-[15px] font-bold">
                  P02200007044
                </p>
              </div>
            </div>

          </div>

          {/* Disclaimer Text */}
          <div className="text-center w-full mx-auto pt-6">
            <p className="text-[#333333] text-[15px] font-[450] leading-relaxed">
              <span className="font-bold">Disclaimer</span> “I authorize The vasavibhuvi and its representatives to Call, SMS, Email or WhatsApp me about their products and offers. This consent overrides any <br className="hidden lg:block" /> registration for DNC / NDNC.”
            </p>
          </div>

        </div>
      </div>

      {/* ── Bottom Section (Dark) ── */}
      <div className="bg-[#102a63] py-6 px-4">
        <p className="text-center text-white text-[13px] font-medium tracking-wide">
          Copyright © 2025 Thevasavigroup.
        </p>
      </div>
    </footer>
  )
}

export default Footer
