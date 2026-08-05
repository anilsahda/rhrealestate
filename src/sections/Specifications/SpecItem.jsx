import { Plus, Minus } from 'lucide-react'

const SpecItem = ({ title, description, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 bg-[#f8fafc] overflow-hidden mb-3">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#f1f5f9]"
      >
        <span className="font-semibold text-[#1e3a8a] text-[15px]">{title}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-gray-700 shrink-0" />
        ) : (
          <Plus className="w-5 h-5 text-gray-700 shrink-0" />
        )}
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-4 bg-white">
          {description}
        </div>
      </div>
    </div>
  )
}

export default SpecItem
