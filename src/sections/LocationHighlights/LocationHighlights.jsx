import { useState, useEffect } from 'react'
import LocationAccordion from './LocationAccordion'
import api from '../../services/api'

const LocationHighlights = ({ onBrochureClick }) => {
  const [openIndex, setOpenIndex] = useState(null)
  const [locationData, setLocationData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Fetch parent location highlights
        const locRes = await api.get('/api/LocationHighlight')
        const locations = locRes.data || []

        // Fetch sub-location highlights
        const subRes = await api.get('/api/SubLocationHighlight')
        const subLocations = subRes.data || []

        // Build combined structure: each location becomes a title with sub-locations as items
        const combined = locations.map((loc) => {
          const children = subLocations
            .filter((sub) => sub.locationHighlightId === loc.id)
            .map((sub) => sub.name)

          return {
            id: loc.id,
            title: loc.name,
            items: children.length > 0 ? children : [loc.locationAddress || loc.name],
          }
        })

        setLocationData(combined)
      } catch (err) {
        console.error('Failed to fetch location highlights:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="location" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          
          {/* ── Left Column: Accordions & Button ── */}
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <h2 className="text-2xl md:text-[32px] font-bold text-[#1e3a8a] mb-2 tracking-wide uppercase">
                Location Highlights
              </h2>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading location highlights...</p>
            ) : locationData.length === 0 ? (
              <p className="text-gray-500">No location highlights found.</p>
            ) : (
              <div className="flex flex-col mb-8">
                {locationData.map((location, index) => (
                  <LocationAccordion 
                    key={location.id}
                    title={location.title}
                    items={location.items}
                    isOpen={openIndex === index}
                    onClick={() => toggleAccordion(index)}
                  />
                ))}
              </div>
            )}

            <div className="mt-auto">
              <button 
                onClick={onBrochureClick}
                className="flex items-center justify-center bg-[#f97316] hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium transition-colors shadow-sm"
              >
                Download Brochure
              </button>
            </div>
          </div>

          {/* ── Right Column: Google Map ── */}
          <div className="w-full h-[400px] lg:h-full min-h-[450px] bg-gray-100 rounded-sm overflow-hidden shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d587999.208252968!2d78.20062244445712!3d17.554874036754146!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f46abc53d2b%3A0xa474b99517dbb7ed!2sVasavi%20bhuvi!5e0!3m2!1sen!2sin!4v1717658216258!5m2!1sen!2sin" 
              className="w-full h-full border-0" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  )
}

export default LocationHighlights
