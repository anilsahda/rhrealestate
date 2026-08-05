import { useState, useEffect } from 'react'
import api from '../services/api'
import Header from '../components/Header/Header'
import Banner from '../sections/Banner/Banner'
import LeadCaptureBar from '../components/common/LeadCaptureBar'
import ProjectOverview from '../sections/ProjectOverview/ProjectOverview'
import VirtualTour from '../sections/VirtualTour/VirtualTour'
import FloorPlans from '../sections/FloorPlans/FloorPlans'
import Amenities from '../sections/Amenities/Amenities'
import Specifications from '../sections/Specifications/Specifications'
import LocationHighlights from '../sections/LocationHighlights/LocationHighlights'
import BrochurePopup from '../components/BrochurePopup/BrochurePopup'
import Footer from '../components/Footer/Footer'

const Home = () => {
  const [brochureOpen, setBrochureOpen] = useState(false)
  const [projectData, setProjectData] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get('/api/Project');
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        if (data) {
          setProjectData(data);
        }
      } catch (error) {
        console.error('Error fetching project data', error);
      }
    };
    fetchProject();
  }, []);

  return (
    <>
      <Header projectData={projectData} onProjectUpdate={setProjectData} />
      <main className="bg-white">
        <Banner projectData={projectData} />
        <LeadCaptureBar onBrochureClick={() => setBrochureOpen(true)} />
        <ProjectOverview projectData={projectData} />
        <VirtualTour />
        <FloorPlans onBrochureClick={() => setBrochureOpen(true)} projectData={projectData} />
        <Amenities projectData={projectData} />
        <Specifications />
        <LocationHighlights onBrochureClick={() => setBrochureOpen(true)} />
        {/* <MapEmbed /> */}
      </main>
      <Footer />

      {/* ── Modal Popups ── */}
      <BrochurePopup isOpen={brochureOpen} onClose={() => setBrochureOpen(false)} />
    </>
  )
}

export default Home
