import { useState, useEffect } from 'react'
import SpecItem from './SpecItem'
import api from '../../services/api'

const Specifications = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const [specificationsData, setSpecificationsData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSpecifications = async () => {
      try {
        // Fetch parent specs
        const specRes = await api.get('/api/Specification')
        const specs = specRes.data || []

        // Fetch sub-specs
        const subRes = await api.get('/api/SubSpecification')
        const subSpecs = subRes.data || []

        // Build combined structure: each spec becomes a title with sub-specs as description
        const combined = specs.map((spec) => {
          const children = subSpecs
            .filter((sub) => sub.specificationId === spec.id)
            .map((sub) => sub.name)

          return {
            id: spec.id,
            title: spec.name,
            description: children.length > 0 ? children.join(', ') : spec.name,
          }
        })

        setSpecificationsData(combined)
      } catch (err) {
        console.error('Failed to fetch specifications:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSpecifications()
  }, [])

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Split data into two columns
  const midpoint = Math.ceil(specificationsData.length / 2)
  const leftColData = specificationsData.slice(0, midpoint)
  const rightColData = specificationsData.slice(midpoint)

  if (loading) {
    return (
      <section id="specifications" className="bg-[#f8fafc] py-16 md:py-24 flex items-center justify-center">
        <p className="text-gray-500">Loading specifications...</p>
      </section>
    )
  }

  return (
    <section id="specifications" className="bg-[#f8fafc] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#1e3a8a] mb-2 tracking-wide uppercase">
            Specifications
          </h2>
        </div>

        {specificationsData.length === 0 ? (
          <p className="text-gray-500">No specifications found.</p>
        ) : (
          /* ── 2-Column Accordion Layout ── */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            
            {/* Left Column */}
            <div className="flex flex-col">
              {leftColData.map((spec, index) => {
                const actualIndex = index
                return (
                  <SpecItem 
                    key={`left-${spec.id}`}
                    title={spec.title}
                    description={spec.description}
                    isOpen={openIndex === actualIndex}
                    onClick={() => toggleAccordion(actualIndex)}
                  />
                )
              })}
            </div>

            {/* Right Column */}
            <div className="flex flex-col">
              {rightColData.map((spec, index) => {
                const actualIndex = index + midpoint
                return (
                  <SpecItem 
                    key={`right-${spec.id}`}
                    title={spec.title}
                    description={spec.description}
                    isOpen={openIndex === actualIndex}
                    onClick={() => toggleAccordion(actualIndex)}
                  />
                )
              })}
            </div>

          </div>
        )}
      </div>
    </section>
  )
}

export default Specifications
