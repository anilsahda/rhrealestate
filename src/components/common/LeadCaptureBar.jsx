import { useState } from 'react'
import api from '../../services/api'

const CONFIGS = [
  { value: '', label: 'Select Configuration' },
  { value: '2bhk', label: '2 BHK' },
  { value: '2.5bhk', label: '2.5 BHK' },
  { value: '3bhk', label: '3 BHK' },
  { value: 'sky-villa', label: 'Sky Villas' },
]

const CONSENT_TEXT =
  'I authorize Vasavi Group and its representatives to Call, SMS, Email or WhatsApp me about its updates and notifications. This consent overrides any registration for DND / NDNC.'

const LeadCaptureBar = ({ onBrochureClick }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    config: '',
    consent: false,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: key === 'consent' ? e.target.checked : e.target.value,
    }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email) {
      alert("Please fill in all required fields (Name, Email, Phone).");
      return;
    }
    setLoading(true);
    try {
      // POST to /api/User matching CreateUserDto: Name, Mobile, Email, Password, AppId
      await api.post('/api/User', {
        name: form.name,
        email: form.email,
        mobile: form.phone,
        password: 'Lead@' + Date.now(), // auto-generated placeholder password
        appId: 'APP001',
      });
      alert('Thank you! Your request has been received. We will contact you shortly.');
      setForm({ name: '', email: '', phone: '', config: '', consent: false });
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Something went wrong while submitting. Please try again.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── Orange lead-capture strip ── */}
      <div className="relative w-full bg-amber-500 z-30">
        <form
          onSubmit={handleSubmit}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
        >
          {/* ── Row 1: Inputs ── */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
            {/* Name */}
            <input
              id="lead-name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange('name')}
              className="flex-1 min-w-0 px-4 py-2.5 text-sm text-gray-800 bg-white
                         border border-white/60 rounded
                         placeholder-gray-400 outline-none
                         focus:ring-2 focus:ring-white/50
                         transition-all duration-200"
            />

            {/* Email */}
            <input
              id="lead-email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange('email')}
              className="flex-1 min-w-0 px-4 py-2.5 text-sm text-gray-800 bg-white
                         border border-white/60 rounded
                         placeholder-gray-400 outline-none
                         focus:ring-2 focus:ring-white/50
                         transition-all duration-200"
            />

            {/* Phone with +91 */}
            <div className="flex flex-1 min-w-0 items-center bg-white border border-white/60 rounded overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 border-r border-gray-200 flex-shrink-0">
                <span className="text-base leading-none">🇮🇳</span>
                <span className="text-sm text-gray-500 font-medium">+91</span>
              </div>
              <input
                id="lead-phone"
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange('phone')}
                maxLength={10}
                className="w-full px-3 py-2.5 text-sm text-gray-800 bg-transparent
                           placeholder-gray-400 outline-none"
              />
            </div>

            {/* Config dropdown */}
            <div className="flex-1 min-w-0 relative">
              <select
                id="lead-config"
                value={form.config}
                onChange={handleChange('config')}
                className="w-full appearance-none px-4 py-2.5 pr-9 text-sm text-gray-800
                           bg-white border border-white/60 rounded
                           outline-none cursor-pointer
                           focus:ring-2 focus:ring-white/50
                           transition-all duration-200"
              >
                {CONFIGS.map(({ value, label }) => (
                  <option key={value} value={value} disabled={value === ''}>
                    {label}
                  </option>
                ))}
              </select>
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

            {/* Get Price Sheet button */}
            <button
              id="lead-submit-btn"
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-bold text-white rounded
                         bg-gray-900 hover:bg-gray-800 disabled:opacity-50
                         shadow-md hover:shadow-lg
                         transition-all duration-200 cursor-pointer
                         whitespace-nowrap tracking-wide flex-shrink-0"
            >
              {loading ? "Sending..." : "Get Price Sheet"}
            </button>
          </div>

          {/* ── Row 2: Consent ── */}
          <div className="mt-3">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                id="lead-consent"
                type="checkbox"
                checked={form.consent}
                onChange={handleChange('consent')}
                className="mt-0.5 w-4 h-4 rounded border-white text-amber-700
                           accent-white cursor-pointer flex-shrink-0"
              />
              <span className="text-[11px] leading-relaxed text-white/90 select-none">
                {CONSENT_TEXT}
              </span>
            </label>
          </div>
        </form>
      </div>

      {/* ── Fixed vertical "Download Brochure" tab on right edge ── */}
      <button
        id="download-brochure-side-tab"
        onClick={onBrochureClick}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50
                   bg-amber-600 hover:bg-amber-700 text-white
                   text-xs font-bold tracking-widest uppercase
                   px-2.5 py-4 rounded-l-lg shadow-lg
                   transition-colors duration-200 cursor-pointer
                   [writing-mode:vertical-rl] rotate-180"
      >
        Download Brochure
      </button>
    </>
  )
}

export default LeadCaptureBar
