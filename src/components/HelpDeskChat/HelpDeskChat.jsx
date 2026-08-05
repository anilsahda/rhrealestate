import { useState, useEffect } from 'react'
import { X, MoreVertical, Send } from 'lucide-react'
import bhuviLogo from '../../assets/images/banner/imgi_1_bhuvi-logo.webp'

const HelpDeskChat = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  // Open with a slight delay for smooth entry, stay open until closed manually
  useEffect(() => {
    const openTimer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(openTimer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setIsOpen(false), 300)
  }

  if (!isOpen) return null

  return (
    <div 
      className={`w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-100 transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-4 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm">
            <img src={bhuviLogo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-[#111111] text-[15px] leading-tight">
              Vasavi Buildox Bhuvi Help Desk
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)] animate-pulse" />
              <span className="text-[#222222] text-[12px] font-medium tracking-wide">We are online to assist you</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors">
            <MoreVertical className="w-5 h-5 text-amber-500" />
          </button>
          <button onClick={handleClose} className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer transition-colors">
            <X className="w-5 h-5 text-amber-500" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* ── Chat Body ── */}
      <div className="p-4 flex-1 h-[400px] overflow-y-auto flex flex-col gap-4 bg-[#f8f9fa]">
        
        {/* Message 1 */}
        <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <img src={bhuviLogo} alt="Logo" className="w-4 h-4 object-contain opacity-80" />
            <span className="text-gray-400 text-[12px] font-medium">Vasavi Buildox Bhuvi 1:27 PM</span>
          </div>
          <p className="text-[#4b5563] text-[14.5px] leading-relaxed">
            Good afternoon. ☀️ Welcome to Vasavi Buildox Bhuvi, Kompally! 👋 Discover a grand lifestyle spread across 10.65 acres. Experience premium living with our apartments with 2, 2.5 & 3 BHK, all with seamless connectivity across the city.
          </p>
        </div>

        {/* Message 2 (Options) */}
        <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm border border-gray-100">
          <p className="text-[#4b5563] text-[14.5px] leading-relaxed mb-4">
            👇 Choose one option to learn more, or feel free to ask your own question!
          </p>
          
          <div className="flex flex-col gap-2.5">
            {/* Grid options */}
            <div className="grid grid-cols-2 gap-2.5">
              <button className="border border-amber-400 bg-white rounded-full py-2 px-2 text-[13.5px] text-gray-700 hover:bg-amber-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <span>📋</span> Project Details
              </button>
              <button className="border border-amber-400 bg-white rounded-full py-2 px-2 text-[13.5px] text-gray-700 hover:bg-amber-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <span className="text-green-500 font-bold">$</span> Current Price
              </button>
              <button className="border border-amber-400 bg-white rounded-full py-2 px-2 text-[13.5px] text-gray-700 hover:bg-amber-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <span>📍</span> Location
              </button>
              <button className="border border-amber-400 bg-white rounded-full py-2 px-2 text-[13.5px] text-gray-700 hover:bg-amber-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <span>🏢</span> Floor Plans
              </button>
            </div>
            
            {/* Full width options */}
            <button className="w-full border border-amber-400 bg-white rounded-full py-2 px-4 text-[13.5px] text-gray-700 hover:bg-amber-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
              <span>📅</span> Book a Site Visit
            </button>
            <button className="w-full border border-amber-400 bg-white rounded-full py-2 px-4 text-[13.5px] text-gray-700 hover:bg-amber-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
              <span>👨‍💼</span> Developer Profile
            </button>
            <button className="w-full border border-amber-400 bg-white rounded-full py-2 px-4 text-[13.5px] text-gray-700 hover:bg-amber-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
              <span>👤</span> Connect to Live Agent
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer Input ── */}
      <div className="bg-white p-3 border-t border-gray-100 flex items-center gap-3">
        <input 
          type="text" 
          placeholder="Type your message..." 
          className="flex-1 border border-gray-200 rounded-full px-5 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-amber-400 bg-white text-gray-800 placeholder-gray-400 transition-shadow"
        />
        <button className="w-10 h-10 shrink-0 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors shadow-md">
          <Send className="w-4 h-4 text-white ml-[-2px]" strokeWidth={2.5} />
        </button>
      </div>

    </div>
  )
}

export default HelpDeskChat
