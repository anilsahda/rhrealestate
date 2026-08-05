import { useState, useEffect } from 'react'
import { X, ZoomIn, Plus, Pencil, Trash2 } from 'lucide-react'
import api from '../../services/api'

// Static fallback images
import masterPlanImg from '../../assets/images/floor-plans/imgi_5_bhuvi-master-plan.png'
import ms1 from '../../assets/images/floor-plans/imgi_7_ms1.webp'
import ms2 from '../../assets/images/floor-plans/imgi_8_ms2.webp'
import ms3 from '../../assets/images/floor-plans/imgi_9_ms3.webp'
import ms4 from '../../assets/images/floor-plans/imgi_6_ms4.webp'
import unit1 from '../../assets/images/floor-plans/imgi_11_unitpl1.webp'
import unit2 from '../../assets/images/floor-plans/imgi_10_unitpl2.webp'

// Auto-slider component for the cards
const CardSlider = ({ images, interval = 2000, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="relative w-full h-[350px] md:h-[400px] flex flex-col items-center justify-between group cursor-pointer" onClick={() => onClick(images[currentIndex])}>
      
      {/* Image container */}
      <div className="w-full h-[90%] relative overflow-hidden flex items-center justify-center p-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i}`}
            className={`absolute max-w-full max-h-full object-contain transition-opacity duration-700 ease-in-out
              ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          />
        ))}
        {/* Zoom Icon overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-20 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 shadow-lg">
            <ZoomIn className="w-6 h-6 text-[#0a2351]" />
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="h-[10%] flex items-center justify-center gap-2 pb-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-gray-600 w-3' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const FloorPlans = ({ onBrochureClick, projectData }) => {
  const [selectedImg, setSelectedImg] = useState(null)
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [editPlan, setEditPlan] = useState(null)
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [addForm, setAddForm] = useState({ name: '', planImage: '', appId: 'APP001' })
  const [editForm, setEditForm] = useState({ name: '', planImage: '', appId: 'APP001' })

  const fetchPlans = async () => {
    try {
      const res = await api.get('/api/Plans')
      setPlans(res.data || [])
    } catch (err) {
      console.error('Failed to fetch plans:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const handleImageUpload = (e, setFormState) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormState(prev => ({ ...prev, planImage: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const openLightbox = (imgSrc) => setSelectedImg(imgSrc)
  const closeLightbox = () => setSelectedImg(null)

  const handleAddSubmit = async () => {
    try {
      await api.post('/api/Plans', {
        name: addForm.name,
        planImage: addForm.planImage,
        appId: addForm.appId,
      })
      await fetchPlans()
      setShowAddPopup(false)
      setAddForm({ name: '', planImage: '', appId: 'APP001' })
    } catch (err) {
      console.error('Failed to add plan:', err)
      alert('Failed to add plan.')
    }
  }

  const openEdit = (plan) => {
    setEditPlan(plan)
    setEditForm({
      name: plan.name,
      planImage: plan.planImage || '',
      appId: plan.appId || 'APP001',
    })
  }

  const handleEditSubmit = async () => {
    try {
      await api.put(`/api/Plans/${editPlan.id}`, {
        id: editPlan.id,
        name: editForm.name,
        planImage: editForm.planImage,
        appId: editForm.appId,
      })
      await fetchPlans()
      setEditPlan(null)
    } catch (err) {
      console.error('Failed to update plan:', err)
      alert('Failed to update plan. Please try again.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return
    try {
      await api.delete(`/api/Plans/${id}`)
      await fetchPlans()
    } catch (err) {
      console.error('Failed to delete plan:', err)
      alert('Failed to delete plan. Please try again.')
    }
  }

  if (loading) {
    return (
      <section id="floor-plans" className="bg-white py-16 md:py-24 flex items-center justify-center">
        <p className="text-gray-500">Loading floor plans...</p>
      </section>
    )
  }

  return (
    <section id="floor-plans" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-2xl md:text-[32px] font-bold text-[#1e3a8a] mb-2 tracking-wide uppercase flex items-center gap-3">
              {projectData?.masterTitle || 'Master Plan & Floor Plans'}
              <button onClick={() => setShowAddPopup(true)} className="p-1 bg-blue-100 hover:bg-blue-200 rounded text-blue-600 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </h2>
            <p className="text-gray-700 text-[15px]">
              {projectData?.masterDescription || 'Explore our Master and Floor Plans for your ideal living space.'}
            </p>
          </div>
          <button 
            onClick={onBrochureClick}
            className="flex items-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white px-6 py-2.5 rounded-sm font-medium transition-colors shadow-sm"
          >
            Download Brochure
          </button>
        </div>

        {/* ── Dynamic Plans Grid ── */}
        {plans.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No plans found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white border border-gray-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-sm flex flex-col">
                <div className="py-4 text-center border-b border-gray-200">
                  <h3 className="text-[#1e3a8a] text-lg font-medium tracking-wide uppercase flex items-center justify-center gap-2">
                    {plan.name}
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(plan)} className="p-1 bg-white hover:bg-gray-100 shadow rounded-full text-blue-600 transition-colors" title="Edit Plan">
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button onClick={() => handleDelete(plan.id)} className="p-1 bg-white hover:bg-red-50 shadow rounded-full text-red-600 transition-colors" title="Delete Plan">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </h3>
                </div>
                <CardSlider images={[plan.planImage].filter(Boolean)} interval={5000} onClick={openLightbox} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox Modal ── */}
      {selectedImg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm" onClick={closeLightbox}>
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/70 hover:text-white transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
          <img 
            src={selectedImg} 
            alt="Enlarged view" 
            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Add Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-xl">
            <button onClick={() => setShowAddPopup(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">Add Plan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name *</label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="e.g. Master Plan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Image Upload *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setAddForm)}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                {addForm.planImage && (
                  <div className="mt-3 p-2 border rounded bg-gray-50 flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium">Preview:</span>
                    <img
                      src={addForm.planImage}
                      alt="preview"
                      className="h-10 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowAddPopup(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
              <button onClick={handleAddSubmit} className="bg-[#f97316] text-white px-5 py-2 rounded font-medium hover:bg-orange-600 transition-colors shadow-sm">Save Plan</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Popup */}
      {editPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-xl">
            <button onClick={() => setEditPlan(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">Edit Plan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name *</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setEditForm)}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                {editForm.planImage && (
                  <div className="mt-3 p-2 border rounded bg-gray-50 flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium">Preview:</span>
                    <img
                      src={editForm.planImage}
                      alt="current"
                      className="h-10 object-contain"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditPlan(null)} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
              <button onClick={handleEditSubmit} className="bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700 transition-colors shadow-sm">Update Plan</button>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

export default FloorPlans
