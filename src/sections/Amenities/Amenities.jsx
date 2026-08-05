import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Plus, Pencil, X, Trash2 } from 'lucide-react'
import api from '../../services/api'


const Amenities = ({ onBrochureClick, projectData }) => {
  const [amenitiesData, setAmenitiesData] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch amenities from backend
  useEffect(() => {
    fetchAmenities();
  }, [])

  // We use 3 copies of the data to create a seamless infinite loop
  const totalItems = amenitiesData.length
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const isHovered = useRef(false)
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [addForm, setAddForm] = useState({ name: '', amentiesImage: '', appId: 'APP001' })
  const [editForm, setEditForm] = useState({ name: '', amentiesImage: '', appId: 'APP001' })

    const fetchAmenities = async () => {
      try {
        const res = await api.get('/api/Amenties')
        setAmenitiesData(res.data || [])
      } catch (err) {
        console.error('Failed to fetch amenities:', err)
      } finally {
        setLoading(false)
      }
    }

  const handleImageUpload = (e, setFormState) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormState(prev => ({ ...prev, amentiesImage: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Reset currentIndex when data loads
  useEffect(() => {
    if (totalItems > 0) {
      setCurrentIndex(totalItems > 5 ? totalItems : 0)
    }
  }, [totalItems])

  const nextSlide = useCallback(() => {
    if (isHovered.current) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }, [])

  const prevSlide = () => {
    if (isHovered.current) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }

  // Auto-slide every 2.5s
  useEffect(() => {
    if (totalItems === 0 || totalItems <= 5) return
    const timer = setInterval(() => {
      nextSlide()
    }, 2500)
    return () => clearInterval(timer)
  }, [nextSlide, totalItems])

  // Handle seamless infinite loop jump
  useEffect(() => {
    if (totalItems === 0 || totalItems <= 5) return
    let timer
    if (currentIndex === totalItems * 2) {
      timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(totalItems)
      }, 500)
    }
    if (currentIndex === 0) {
      timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(totalItems)
      }, 500)
    }
    return () => clearTimeout(timer)
  }, [currentIndex, totalItems])

  // Restore transition after disable
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  const shouldLoop = totalItems > 5
  const displayItems = totalItems > 0
    ? (shouldLoop ? [...amenitiesData, ...amenitiesData, ...amenitiesData] : amenitiesData)
    : []

  // --- CRUD handlers ---
  const handleAddSubmit = async () => {
  try {
    await api.post('/api/Amenties', {
      name: addForm.name,
      amentiesImage: addForm.amentiesImage,
      appId: addForm.appId,
    });

    await fetchAmenities();

    setShowAddPopup(false);
    setAddForm({
      name: "",
      amentiesImage: "",
      appId: "APP001",
    });
  } catch (err) {
    console.error("Failed to add amenity:", err);
    alert("Failed to add amenity.");
  }
};

  const openEdit = (amenity) => {
    setEditItem(amenity);
    setEditForm({
      name: amenity.name,
      amentiesImage: amenity.amentiesImage || '',
      appId: amenity.appId || 'APP001',
    });
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(`/api/Amenties/${editItem.id}`, {
        id: editItem.id,
        name: editForm.name,
        amentiesImage: editForm.amentiesImage,
        appId: editForm.appId,
      });

      await fetchAmenities();
      setEditItem(null);
    } catch (err) {
      console.error('Failed to update amenity:', err);
      alert('Failed to update amenity. Please try again.');
    }
  };

  const handleDelete = async (amenity) => {
    if (!window.confirm('Are you sure you want to delete this amenity?')) return;
    try {
      await api.delete(`/api/Amenties/${amenity.id}`);
      await fetchAmenities();
    } catch (err) {
      console.error('Failed to delete amenity:', err);
      alert('Failed to delete amenity. Please try again.');
    }
  };

  if (loading) {
    return (
      <section id="amenities" className="bg-white py-16 md:py-24 flex items-center justify-center">
        <p className="text-gray-500">Loading amenities...</p>
      </section>
    )
  }

  return (
    <section id="amenities" className="bg-white py-16 md:py-24 overflow-hidden">
      <style>
        {`
          .amenities-track {
            --items-per-page: 2;
          }
          @media (min-width: 768px) {
            .amenities-track { --items-per-page: 3; }
          }
          @media (min-width: 1024px) {
            .amenities-track { --items-per-page: 5; }
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-[32px] font-bold text-[#1e3a8a] mb-2 tracking-wide uppercase flex items-center gap-3">
              {projectData?.amentiesTitle || 'Amenities'}
              <button onClick={() => setShowAddPopup(true)} className="p-1 bg-blue-100 hover:bg-blue-200 rounded text-blue-600 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </h2>
            <p className="text-gray-700 text-[15px] leading-relaxed">
              {projectData?.amentiesDescription || 'Explore our thoughtfully designed amenities at Vasavi Bhuvi for a luxurious and convenient living experience.'}
            </p>
          </div>
          <button 
            onClick={onBrochureClick}
            className="flex items-center justify-center bg-[#f97316] hover:bg-orange-600 text-white px-6 py-2.5 rounded-sm font-medium transition-colors shadow-sm shrink-0"
          >
            Download Brochure
          </button>
        </div>

        {/* ── Amenities Carousel ── */}
        {totalItems === 0 ? (
          <div className="text-center text-gray-500 py-12">No amenities found.</div>
        ) : (
          <div 
            className="relative flex items-center justify-center w-full px-8 md:px-12"
            onMouseEnter={() => (isHovered.current = true)}
            onMouseLeave={() => (isHovered.current = false)}
          >
            
            {/* Left Arrow */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 z-10 w-10 h-10 bg-[#f97316] hover:bg-orange-600 rounded-full flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Slider Track Wrapper */}
            <div className="w-full overflow-hidden">
              <div 
                className={`amenities-track flex w-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ transform: `translateX(calc(-100% * ${currentIndex} / var(--items-per-page)))` }}
              >
                {displayItems.map((amenity, index) => (
                  <div 
                    key={`${amenity.id}-${index}`} 
                    className="flex-none flex flex-col items-center justify-center w-1/2 md:w-1/3 lg:w-1/5 px-2"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110 relative group">
                      <img 
                        src={amenity.amentiesImage || 'https://placehold.co/96x96/e2e8f0/64748b?text=🏠'} 
                        alt={amenity.name} 
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => { e.target.src = 'https://placehold.co/96x96/e2e8f0/64748b?text=🏠' }}
                      />
                      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 flex flex-col gap-1 p-1">
                        <button 
                          onClick={() => openEdit(amenity)} 
                          className="p-1.5 bg-white shadow rounded-full text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all"
                          title="Edit Amenity"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(amenity)} 
                          className="p-1.5 bg-white shadow rounded-full text-red-600 hover:text-red-800 hover:bg-red-50 transition-all"
                          title="Delete Amenity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-center text-[13px] md:text-[15px] text-gray-800 font-medium leading-tight">
                      {amenity.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={nextSlide}
              className="absolute right-0 z-10 w-10 h-10 bg-[#f97316] hover:bg-orange-600 rounded-full flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            
          </div>
        )}

      </div>
      
      {/* Add Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-xl">
            <button onClick={() => setShowAddPopup(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">Add Amenity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amenity Name *</label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="e.g. Swimming Pool"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setAddForm)}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                {addForm.amentiesImage && (
                  <div className="mt-3 p-2 border rounded bg-gray-50 flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium">Preview:</span>
                    <img
                      src={addForm.amentiesImage}
                      alt="preview"
                      className="h-10 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowAddPopup(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
              <button onClick={handleAddSubmit} className="bg-[#f97316] text-white px-5 py-2 rounded font-medium hover:bg-orange-600 transition-colors shadow-sm">Save Amenity</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Popup */}
      {editItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-xl">
            <button onClick={() => setEditItem(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#1e3a8a]">Edit Amenity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amenity Name *</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setEditForm)}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                {editForm.amentiesImage && (
                  <div className="mt-3 p-2 border rounded bg-gray-50 flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium">Preview:</span>
                    <img
                      src={editForm.amentiesImage}
                      alt="current"
                      className="h-10 object-contain"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditItem(null)} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
              <button onClick={handleEditSubmit} className="bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700 transition-colors shadow-sm">Update Amenity</button>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

export default Amenities
