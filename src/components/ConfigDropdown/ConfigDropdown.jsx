import { useState } from 'react'

const CONFIGS = [
  { value: '', label: 'Select Configuration' },
  { value: '2bhk', label: '2 BHK' },
  { value: '2.5bhk', label: '2.5 BHK' },
  { value: '3bhk', label: '3 BHK' },
  { value: 'sky-villa', label: 'Sky Villas' },
]

const ConfigDropdown = ({ value, onChange, error }) => {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative w-full">
      {/* Label */}
      <label
        htmlFor="config-select"
        className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
      >
        Configuration
      </label>

      {/* Select wrapper for custom chevron */}
      <div className={`relative rounded-xl border-2 transition-colors duration-200
        ${focused ? 'border-amber-400' : error ? 'border-red-400' : 'border-gray-200'}
        bg-white`}
      >
        <select
          id="config-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full appearance-none bg-transparent px-4 py-3 pr-10 text-sm font-medium
                     text-gray-800 rounded-xl focus:outline-none cursor-pointer"
        >
          {CONFIGS.map(({ value: v, label }) => (
            <option key={v} value={v} disabled={v === ''}>
              {label}
            </option>
          ))}
        </select>

        {/* Custom chevron */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

export default ConfigDropdown
