import { Play, Clock, Share2 } from 'lucide-react'
import React from 'react'
import pandaRoomImg from '../../assets/images/virtualTour/panda-room.png'
import bhuviLogo from '../../assets/images/logo/bhuvi-logo.webp'

const VirtualTour = ({ projectData }) => {
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
    return url;
  };

  const embedUrl = projectData?.youtube ? getEmbedUrl(projectData.youtube) : null;
  const [showVideo, setShowVideo] = React.useState(false);

  return (
    <section className="bg-white w-full">
      <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[2.4/1] overflow-hidden group">
        
        {showVideo && embedUrl ? (
          <iframe 
            src={embedUrl} 
            title="Virtual Tour"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full cursor-pointer" onClick={() => embedUrl ? setShowVideo(true) : null}>
            {/* Background Cover Image */}
        <img
          src={pandaRoomImg}
          alt="Panda Playroom Virtual Tour"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none"></div>

        {/* Top Left Header (Logo + Title) */}
        <div className="absolute top-4 left-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden shrink-0">
            <img src={bhuviLogo} alt="Logo" className="w-full h-auto object-contain" />
          </div>
          <div className="text-white drop-shadow-md">
            <h3 className="font-bold text-base md:text-lg leading-tight tracking-wide">
              VASAVI BHUVI VIRTUAL TOUR
            </h3>
            <p className="text-xs text-gray-200">Vasavi Group</p>
          </div>
        </div>

        {/* Center Red Play Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
          <div className="w-[68px] h-[48px] bg-[#ff0000] rounded-xl flex items-center justify-center shadow-lg hover:bg-[#e60000] transition-colors cursor-pointer">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Bottom Bar Icons (Watch Later, Share) */}
        <div className="absolute bottom-4 left-4 flex gap-3 z-10">
          <button className="bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full transition-colors flex items-center justify-center backdrop-blur-sm">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full transition-colors flex items-center justify-center backdrop-blur-sm">
            <Clock className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Right Watch on YouTube */}
        <div className="absolute bottom-4 right-4 z-10">
          <button className="bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 backdrop-blur-sm font-semibold text-sm">
            Watch on 
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ml-1">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default VirtualTour
