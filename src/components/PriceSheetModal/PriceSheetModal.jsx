import { useState, useEffect } from 'react'
import { X, ChevronDown } from 'lucide-react'

const PriceSheetModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Open automatically after a short delay on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <>
      {/* Mobile Backdrop (optional, but good for UX if it's fixed) */}
      <div 
        className="fixed inset-0 bg-black/40 z-[140] lg:hidden backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Container */}
      <div className="fixed z-[150] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-28 lg:translate-y-0 lg:left-auto lg:translate-x-0 lg:right-[5%] w-[90%] max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-[fadeInUp_0.4s_ease-out]">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/50 hover:bg-white rounded-full text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Info Bar */}
        <div className="bg-[#fffdf5] border-b border-[#f3eac1] py-3 px-4 flex items-center justify-between text-[12px] md:text-[13px] font-medium text-gray-600">
          <div className="flex items-center gap-1.5">
            <span>🏆</span> RERA Approved
          </div>
          <div className="flex items-center gap-1.5">
            <span>📍</span> Kompally
          </div>
          <div className="flex items-center gap-1.5">
            <span>🔑</span> 2–3 BHK & Sky Villas
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8">
          <h4 className="text-[#f59e0b] text-[12px] font-bold tracking-[0.15em] uppercase mb-1">
            Limited Inventory
          </h4>
          <h2 className="text-[26px] md:text-[30px] font-extrabold text-[#0f172a] mb-2 leading-[1.1]">
            Get Your Price Sheet
          </h2>
          <p className="text-gray-500 text-[14px] mb-6">
            Fill in the details below and we'll send you the latest pricing instantly.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <div>
              <label className="block text-gray-500 text-[12px] font-bold tracking-wide uppercase mb-1.5">
                Full Name
              </label>
              <input 
                type="text" 
                placeholder="Your full name"
                required
                className="w-full border border-gray-200 rounded-[10px] px-4 py-3 text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-colors"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-gray-500 text-[12px] font-bold tracking-wide uppercase mb-1.5">
                Mobile Number
              </label>
              <input 
                type="tel" 
                placeholder="10-digit mobile number"
                required
                className="w-full border border-gray-200 rounded-[10px] px-4 py-3 text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-colors"
              />
            </div>

            {/* Configuration */}
            <div>
              <label className="block text-gray-500 text-[12px] font-bold tracking-wide uppercase mb-1.5">
                Configuration
              </label>
              <div className="relative">
                <select 
                  required
                  className="w-full border border-gray-200 rounded-[10px] px-4 py-3 text-[15px] text-gray-600 appearance-none bg-white focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-colors cursor-pointer"
                >
                  <option value="">Select Configuration</option>
                  <option value="2bhk">2 BHK</option>
                  <option value="3bhk">3 BHK</option>
                  <option value="sky-villa">Sky Villas</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3 pt-3">
              <input 
                type="checkbox" 
                id="price-consent" 
                defaultChecked
                className="mt-1 w-4 h-4 text-[#fbbf24] border-gray-300 rounded focus:ring-[#fbbf24] cursor-pointer shrink-0"
              />
              <label htmlFor="price-consent" className="text-gray-500 text-[12px] leading-relaxed cursor-pointer">
                I authorize Vasavi Buildox & its representatives to Call, SMS, Email or WhatsApp me about its products & offers. This consent overrides any registration for DNC / NDNC.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-white font-bold text-[17px] py-4 rounded-[10px] mt-2 transition-all shadow-[0_4px_14px_0_rgba(251,191,36,0.39)] hover:shadow-[0_6px_20px_rgba(251,191,36,0.23)] hover:-translate-y-0.5"
            >
              Get Price Sheet →
            </button>
          </form>

        </div>
      </div>
    </>
  )
}

export default PriceSheetModal
