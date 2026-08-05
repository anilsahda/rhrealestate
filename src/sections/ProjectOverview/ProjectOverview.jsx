import { useEffect, useRef, useState } from 'react';
import {
  HeartPulse,
  LayoutGrid,
  Trophy,
  Bike,
  Gamepad2,
  School,
} from 'lucide-react';

import entranceImg from '../../assets/images/projectOverview/imgi_4_block-entrance-6661678486813.png';

const FEATURES = [
  { icon: HeartPulse, label: 'Medical Room' },
  { icon: LayoutGrid, label: 'Smart Rooms' },
  { icon: Trophy, label: 'Sports Space' },
  { icon: Bike, label: 'Cycling Track' },
  { icon: Gamepad2, label: 'Indoor Sports Room' },
  { icon: School, label: 'Close to Schools' },
];

const useFadeIn = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const ProjectOverview = ({ projectData }) => {
  const [sectionRef, sectionVisible] = useFadeIn();
  
  const overview = projectData;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white py-10 md:py-14 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          <div
            className={`w-full lg:w-[55%] flex flex-col justify-between py-4 transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <h2 className="text-2xl md:text-[28px] font-bold text-[#0a2351] mb-5 leading-tight">
                {overview?.overviewTitle || 'Project Overview'}
              </h2>

              <p className="text-[15px] text-gray-600 leading-[1.7] mb-12 whitespace-pre-wrap">
                {overview?.description ||
                  `Introducing the lavish Vasavi Bhuvi at Kompally, Hyderabad, spanning over
10.65 acres with a hassle-free access from any corner of the city. With 8 towers,
17 floors each, it offers premium 2, 2.5, and 3 BHK apartments. Boasting 65%
open space, the 1208-unit complex includes two opulent clubhouses covering
50,000 sqft.`}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-x-4 gap-y-10">
              {FEATURES.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center text-center gap-3 transition-all duration-500 ${
                    sectionVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <Icon
                    className="w-[42px] h-[42px] text-[#f97316]"
                    strokeWidth={1.5}
                  />
                  <span className="text-[13px] font-semibold text-[#0a2351]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`w-full lg:w-[45%] transition-all duration-700 delay-200 ${
              sectionVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <img
              src={overview?.overviewImage ? (overview.overviewImage.startsWith('http') || overview.overviewImage.startsWith('data') ? overview.overviewImage : `https://localhost:7104${overview.overviewImage}`) : entranceImg}
              alt={overview?.name || 'Project Overview'}
              className="w-full h-full object-cover min-h-[400px]"
              loading="lazy"
              onError={(e) => { e.target.src = entranceImg; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;