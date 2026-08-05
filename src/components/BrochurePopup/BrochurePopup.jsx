import { X, ChevronDown } from 'lucide-react'

const BrochurePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative w-full max-w-[450px] bg-white shadow-2xl animate-[fadeInUp_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative py-4 border-b border-gray-100">
          <h2 className="text-center text-lg md:text-[20px] font-semibold text-gray-800">
            Download Brochure
          </h2>
          <button
            onClick={onClose}
            aria-label="Close popup"
            className="absolute top-1/2 -translate-y-1/2 right-4 p-1 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              // TODO: wire to API / PDF download
              onClose()
            }}
          >
            {/* Name Input */}
            <div>
              <input
                type="text"
                required
                placeholder="Name"
                className="w-full px-3 py-2.5 text-[15px] border border-gray-200 rounded-[3px]
                           focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full px-3 py-2.5 text-[15px] border border-gray-200 rounded-[3px]
                           focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {/* Phone Input */}
            <div className="flex border border-gray-200 rounded-[3px] focus-within:border-gray-400 transition-colors overflow-hidden">
              <div className="flex items-center px-3 bg-[#f8f9fa] border-r border-gray-200 text-[15px] text-gray-700 cursor-pointer">
                <img 
                  src="https://flagcdn.com/w40/in.png" 
                  alt="India Flag" 
                  className="w-[22px] h-[15px] mr-2 object-cover rounded-[2px]" 
                />
                <span>+91</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-600" strokeWidth={2.5} />
              </div>
              <input
                type="tel"
                required
                placeholder="Phone"
                className="w-full px-3 py-2.5 text-[15px] focus:outline-none bg-white"
              />
            </div>

            {/* Select Configuration */}
            <div className="relative">
              <select
                className="w-full px-3 py-2.5 text-[15px] border border-gray-200 rounded-[3px] appearance-none bg-white
                           focus:outline-none focus:border-gray-400 transition-colors text-gray-600 cursor-pointer"
              >
                <option value="">Select Configuration</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="consent"
                defaultChecked
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="consent" className="text-[13.5px] text-gray-700 leading-relaxed cursor-pointer">
                I authorize Vasavi Group and its representatives to Call, SMS, Email or WhatsApp me about its updates and notifications. This consent overrides any registration for DND / NDNC.
              </label>
            </div>

            <div className="border-t border-gray-100 my-6"></div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 text-[15px] font-medium text-white rounded-[3px]
                         bg-black hover:bg-gray-900 transition-colors shadow-sm"
            >
              Enquire Now
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BrochurePopup
