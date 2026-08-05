import { useState, useEffect } from 'react'
import { X, MoreVertical, Send } from 'lucide-react'
import bhuviLogo from '../../assets/images/banner/imgi_1_bhuvi-logo.webp'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  // Open with a slight delay for smooth entry, stay open until closed manually
  useEffect(() => {
    // Slight delay so it doesn't abruptly pop on instant load
    const openTimer = setTimeout(() => setIsVisible(true), 500)

    return () => {
      clearTimeout(openTimer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setIsOpen(false), 300)
  }

  if (!isOpen) return null

  return (
    <div 
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-8 lg:bottom-8 lg:right-10 w-[360px] max-w-[calc(100vw-32px)] bg-[#f8f9fa] rounded-2xl shadow-2xl z-[200] overflow-hidden flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right
        ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'}`}
    >
      {/* ── Header ── */}
      <div className="bg-[#ebb51a] px-4 py-4 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center shrink-0">
            <img src={bhuviLogo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-extrabold text-[#111111] text-[16px] leading-tight">
              Vasavi Buildox Bhuvi Help Desk
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00d084]" />
              <span className="text-[#222222] text-[13px] font-medium">We are online to assist you</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
            <MoreVertical className="w-5 h-5 text-[#ebb51a]" />
          </button>
          <button onClick={handleClose} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50">
            <X className="w-5 h-5 text-[#ebb51a]" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* ── Chat Body ── */}
      <div className="p-4 flex-1 h-[420px] overflow-y-auto flex flex-col gap-4">
        
        {/* Message 1 */}
        <div className="bg-white rounded-3xl rounded-tl-sm p-4 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.08)] border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <img src={bhuviLogo} alt="Logo" className="w-4 h-4 object-contain opacity-80" />
            <span className="text-gray-400 text-[12px] font-medium">Vasavi Buildox Bhuvi 1:18 PM</span>
          </div>
          <p className="text-[#333333] text-[15px] leading-relaxed">
            Good afternoon. 🌟 Welcome to Vasavi Buildox Bhuvi, Kompally! 👋 Discover a grand lifestyle spread across 10.65 acres. Experience premium living with our apartments with 2, 2.5 & 3 BHK, all with seamless connectivity across the city.
          </p>
        </div>

        {/* Message 2 (Options) */}
        <div className="bg-white rounded-3xl rounded-tl-sm p-4 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.08)] border border-gray-100">
          <p className="text-[#333333] text-[15px] leading-relaxed mb-4">
            👇 Choose one option to learn more, or feel free to ask your own question!
          </p>
          
          <div className="flex flex-col gap-3">
            {/* Grid options */}
            <div className="grid grid-cols-2 gap-3">
              <button className="border border-[#ebb51a] rounded-full py-2 px-2 text-[14px] text-gray-800 hover:bg-[#fff9e6] transition-colors flex items-center justify-center gap-2">
                <span>📋</span> Project Details
              </button>
              <button className="border border-[#ebb51a] rounded-full py-2 px-2 text-[14px] text-gray-800 hover:bg-[#fff9e6] transition-colors flex items-center justify-center gap-2">
                <span className="text-green-500 font-bold">$</span> Current Price
              </button>
              <button className="border border-[#ebb51a] rounded-full py-2 px-2 text-[14px] text-gray-800 hover:bg-[#fff9e6] transition-colors flex items-center justify-center gap-2">
                <span>📍</span> Location
              </button>
              <button className="border border-[#ebb51a] rounded-full py-2 px-2 text-[14px] text-gray-800 hover:bg-[#fff9e6] transition-colors flex items-center justify-center gap-2">
                <span>🏢</span> Floor Plans
              </button>
            </div>
            
            {/* Full width options */}
            <button className="w-full border border-[#ebb51a] rounded-full py-2 px-4 text-[14px] text-gray-800 hover:bg-[#fff9e6] transition-colors flex items-center justify-center gap-2">
              <span>🗓️</span> Book a Site Visit
            </button>
            <button className="w-full border border-[#ebb51a] rounded-full py-2 px-4 text-[14px] text-gray-800 hover:bg-[#fff9e6] transition-colors flex items-center justify-center gap-2">
              <span>👨‍💼</span> Developer Profile
            </button>
            <button className="w-full border border-[#ebb51a] rounded-full py-2 px-4 text-[14px] text-gray-800 hover:bg-[#fff9e6] transition-colors flex items-center justify-center gap-2">
              <span>👩‍💼</span> Connect to Live Agent
            </button>
          </div>
        </div>

      </div>

      {/* ── Footer Input ── */}
      <div className="bg-white p-4 border-t border-gray-100 flex items-center gap-3">
        <input 
          type="text" 
          placeholder="Type your message..." 
          className="flex-1 border border-[#ebb51a] rounded-full px-5 py-2.5 text-[15px] focus:outline-none focus:ring-1 focus:ring-[#ebb51a] bg-white text-gray-800 placeholder-gray-400"
        />
        <button className="w-11 h-11 shrink-0 bg-[#ebb51a] hover:bg-[#dca310] rounded-full flex items-center justify-center transition-colors shadow-sm">
          <Send className="w-5 h-5 text-[#111] ml-[-2px]" strokeWidth={2.5} />
        </button>
      </div>

    </div>
  )
}

export default ChatWidget
