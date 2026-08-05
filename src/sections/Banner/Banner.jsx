import bannerDesktop from '../../assets/images/banner/imgi_2_Bhuvi-Bannerw.png'
import bannerMobile from '../../assets/images/banner/Bhuvi_Banner-460x400_PS.webp'
import HelpDeskChat from '../../components/HelpDeskChat/HelpDeskChat'

const Banner = ({ projectData }) => {
  return (
    <section
      id="home"
      className="relative w-full flex flex-col overflow-hidden bg-[#111] pt-16 lg:pt-0 lg:min-h-[90vh]"
    >
      {/* Desktop Background image */}
      <img
        src={
          projectData?.bannerImage
            ? projectData.bannerImage.startsWith('http') ||
              projectData.bannerImage.startsWith('data')
              ? projectData.bannerImage
              : `https://localhost:7104${projectData.bannerImage}`
            : bannerDesktop
        }
        alt="Vasavi Buildox Bhuvi – Premium Gated Community, Kompally"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover object-left"
        fetchPriority="high"
      />
      <div className="hidden lg:block absolute inset-0 bg-black/10 lg:bg-transparent" />

      {/* Mobile Background image */}
      <div className="block lg:hidden w-full relative">
        <img
          src={
            projectData?.bannerImage
              ? projectData.bannerImage.startsWith('http') ||
                projectData.bannerImage.startsWith('data')
                ? projectData.bannerImage
                : `https://localhost:7104${projectData.bannerImage}`
              : bannerMobile
          }
          alt="Vasavi Buildox Bhuvi – Premium Gated Community, Kompally"
          className="w-full h-auto block"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* ── Content layer ── */}
      <div className="hidden lg:flex relative flex-1 flex-col lg:flex-row items-end lg:items-end justify-between max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-8 lg:pt-24 lg:pb-10 gap-6">

        {/* Left: Badge strip */}
        <div className="flex items-end pb-2">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 w-fit shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-white text-[13px] lg:text-sm font-bold tracking-widest uppercase">
              Now Open for Bookings
            </span>
          </div>
        </div>

        {/* Right: Chat Widget */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <HelpDeskChat />
        </div>

      </div>
    </section>
  )
}

export default Banner
