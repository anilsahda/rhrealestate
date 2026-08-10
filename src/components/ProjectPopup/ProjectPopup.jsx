import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import api from '../../services/api';

const ProjectPopup = ({ isOpen, onClose, projectData, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    overviewTitle: '',
    description: '',
    youtube: '',
    masterTitle: '',
    masterDescription: '',
    amentiesTitle: '',
    amentiesDescription: '',
    logo: '',
    bannerImage: '',
    overviewImage: '',
    otherDetails: '',
    appId: 'APP001',
    specificationsTitle: '',
    specificationsDescription: '',
    locationHighlightsTitle: '',
    locationHighlightsDescription: ''
  });

  const [imagePreviews, setImagePreviews] = useState({
    logo: '',
    bannerImage: '',
    overviewImage: ''
  });

  useEffect(() => {
    if (isOpen) {
      fetchProjectData();
    }
  }, [isOpen]);

  const fetchProjectData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/Project');
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      if (data) {
        populateForm(data);
      } else if (projectData) {
        populateForm(projectData);
      } else {
        resetForm();
      }
    } catch (err) {
      console.error('Failed to fetch project', err);
      if (projectData) {
        populateForm(projectData);
      }
    } finally {
      setLoading(false);
    }
  };

  const populateForm = (data) => {
    setFormData({
      id: data.id || '',
      name: data.name || '',
      overviewTitle: data.overviewTitle || '',
      description: data.description || '',
      youtube: data.youtube || '',
      masterTitle: data.masterTitle || '',
      masterDescription: data.masterDescription || '',
      amentiesTitle: data.amentiesTitle || '',
      amentiesDescription: data.amentiesDescription || '',
      logo: data.logo || '',
      bannerImage: data.bannerImage || '',
      overviewImage: data.overviewImage || '',
      otherDetails: data.otherDetails || '',
      appId: data.appId || 'APP001',
      specificationsTitle: data.specificationsTitle || '',
      specificationsDescription: data.specificationsDescription || '',
      locationHighlightsTitle: data.locationHighlightsTitle || '',
      locationHighlightsDescription: data.locationHighlightsDescription || ''
    });
    setImagePreviews({
      logo: data.logo || '',
      bannerImage: data.bannerImage || '',
      overviewImage: data.overviewImage || ''
    });
  };

  const resetForm = () => {
    setFormData({
      id: '', name: '', overviewTitle: '', description: '', youtube: '',
      masterTitle: '', masterDescription: '', amentiesTitle: '', amentiesDescription: '',
      logo: '', bannerImage: '', overviewImage: '', otherDetails: '', appId: 'APP001',
      specificationsTitle: '', specificationsDescription: '', locationHighlightsTitle: '', locationHighlightsDescription: ''
    });
    setImagePreviews({ logo: '', bannerImage: '', overviewImage: '' });
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result }));
        setImagePreviews(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = { ...formData };
      
      // Clean up payload (remove empty id for POST, parse id for PUT)
      if (!payload.id) {
        delete payload.id;
      } else {
        payload.id = Number(payload.id);
      }

      console.log("Sending Project:", payload);

      let response;
      if (formData.id) {
        response = await api.put(`/api/Project/${formData.id}`, payload);
      } else {
        response = await api.post('/api/Project', payload);
      }

      // Fetch the latest to pass to parent
      const freshRes = await api.get('/api/Project');
      const freshData = Array.isArray(freshRes.data) ? freshRes.data[0] : freshRes.data;
      
      if (onSave) {
        onSave(freshData);
      }
      onClose();
    } catch (err) {
      console.error('Save failed', err);
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        const errorData = err.response.data;
        let errorMsg = 'Failed to save project. Check console.';
        if (errorData.errors) {
            errorMsg = Object.values(errorData.errors).flat().join(' | ');
        } else if (errorData.title) {
            errorMsg = errorData.title;
        } else if (typeof errorData === 'string') {
            errorMsg = errorData;
        }
        setError(errorMsg);
      } else {
        setError('Failed to save project. Check console for details.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-[140] backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed z-[150] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1100px] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-[fadeInUp_0.4s_ease-out]">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center bg-white/50 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="bg-[#fffdf5] border-b border-[#f3eac1] py-3 px-4">
          <h2 className="text-[20px] font-extrabold text-[#0f172a]">Edit Project Details</h2>
        </div>
        <div className="p-4 md:p-5 overflow-y-auto flex-1">
          {error && <div className="mb-3 text-red-600 font-semibold">{error}</div>}
          <form id="project-form" onSubmit={handleSubmit}>
            
            {/* Row 1: Project Name */}
            <input type="text" name="name" value={formData.name} placeholder='Project Name' onChange={handleTextChange} className="w-full border rounded px-3 py-2 mb-3 focus:ring-amber-400 focus:border-amber-400 outline-none" required />
            
            {/* Row 2: Images */}
            <div className="flex flex-wrap gap-4 mb-4">
              <ImageUploadField label="Logo" field="logo" preview={imagePreviews.logo} onChange={handleImageChange} />
              <ImageUploadField label="Banner Image" field="bannerImage" preview={imagePreviews.bannerImage} onChange={handleImageChange} />
              <ImageUploadField label="Overview Image" field="overviewImage" preview={imagePreviews.overviewImage} onChange={handleImageChange} />
            </div>

            {/* Overview Section */}
            <div className="border-t border-gray-200 pt-3 mb-4">
              <h3 className="font-bold text-[14px] mb-3 text-[#f59e0b]">Overview Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input type="text" name="overviewTitle" value={formData.overviewTitle} placeholder='Overview Title' onChange={handleTextChange} className="w-full border rounded px-3 py-2 focus:ring-amber-400 focus:border-amber-400 outline-none" required />
                <input type="text" name="youtube" value={formData.youtube} onChange={handleTextChange} placeholder='Youtube Link' className="w-full border rounded px-3 py-2 focus:ring-amber-400 focus:border-amber-400 outline-none" />
              </div>
              <textarea name="description" value={formData.description} onChange={handleTextChange} placeholder='Description' className="w-full border rounded px-3 py-2 focus:ring-amber-400 focus:border-amber-400 outline-none h-[80px]" required></textarea>
            </div>

            {/* Master & Amenities Section */}
            <div className="border-t border-gray-200 pt-3">
              <h3 className="font-bold text-[14px] mb-3 text-[#f59e0b]">Master & Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input type="text" name="masterTitle" value={formData.masterTitle} onChange={handleTextChange} placeholder='Master Title' className="w-full border rounded px-3 py-2 focus:ring-amber-400 focus:border-amber-400 outline-none" required />
                <input type="text" name="amentiesTitle" value={formData.amentiesTitle} onChange={handleTextChange} placeholder='Amenities Title' className="w-full border rounded px-3 py-2 focus:ring-amber-400 focus:border-amber-400 outline-none" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea name="masterDescription" value={formData.masterDescription} onChange={handleTextChange} placeholder='Master Description' className="w-full border rounded px-3 py-2 focus:ring-amber-400 focus:border-amber-400 outline-none h-[70px]" required></textarea>
                <textarea name="amentiesDescription" value={formData.amentiesDescription} onChange={handleTextChange} placeholder='Amenities Description' className="w-full border rounded px-3 py-2 focus:ring-amber-400 focus:border-amber-400 outline-none h-[70px]" required></textarea>
              </div>
            </div>

            {/* Specifications & Highlights Section */}
            <div className="border-t border-gray-200 pt-3 mt-4">
              <h3 className="font-bold text-[14px] mb-3 text-[#f59e0b]">Specifications & Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input type="text" name="specificationsTitle" value={formData.specificationsTitle} onChange={handleTextChange} placeholder='Specifications Title' className="w-full border rounded px-3 py-2 focus:ring-amber-400 focus:border-amber-400 outline-none" required />
                <input type="text" name="locationHighlightsTitle" value={formData.locationHighlightsTitle} onChange={handleTextChange} placeholder='Location Highlights Title' className="w-full border rounded px-3 py-2 focus:ring-amber-400 focus:border-amber-400 outline-none" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea name="specificationsDescription" value={formData.specificationsDescription} onChange={handleTextChange} placeholder='Specifications Description' className="w-full border rounded px-3 py-2 focus:ring-amber-400 focus:border-amber-400 outline-none h-[70px]" required></textarea>
                <textarea name="locationHighlightsDescription" value={formData.locationHighlightsDescription} onChange={handleTextChange} placeholder='Location Highlights Description' className="w-full border rounded px-3 py-2 focus:ring-amber-400 focus:border-amber-400 outline-none h-[70px]" required></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="border-t p-3 flex justify-end gap-2 bg-gray-50">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            Cancel
          </button>
          <button type="submit" form="project-form" disabled={loading} className="px-6 py-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-white font-bold rounded-md shadow-md transition-all">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </>
  );
};

const ImageUploadField = ({ label, field, preview, onChange }) => {
  const fileInputRef = useRef(null);

  return (
    <div className="flex flex-col gap-1 w-[150px]">
      <label className="block text-gray-700 font-bold text-[13px]">{label}</label>
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg w-[150px] h-[90px] flex items-center justify-center overflow-hidden relative group cursor-pointer hover:border-amber-400 shrink-0"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img src={preview.startsWith('http') || preview.startsWith('data') ? preview : `https://localhost:7104${preview}`} alt={label} className="w-full h-full object-cover" onError={(e) => e.target.src = preview} />
        ) : (
          <div className="text-gray-400 text-sm">Click to upload</div>
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-sm font-semibold">{preview ? 'Replace Image' : 'Upload Image'}</span>
        </div>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => onChange(e, field)} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};

export default ProjectPopup;
