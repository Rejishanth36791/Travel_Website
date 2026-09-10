import React, { useState } from 'react';
import { Play, Sparkles, X } from 'lucide-react';
import { Modal } from '@/components/common/Modal';

export const VideoInspirationSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const videoTeasers = [
    {
      id: 'vid-1',
      title: 'Midnight Sun in the Norwegian Fjords',
      duration: '4:15',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'vid-2',
      title: 'Solitary Hikes in Rocky Mountain NP',
      duration: '6:30',
      thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'vid-3',
      title: 'Ancient Temples of Kyoto at Twilight',
      duration: '3:45',
      thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white rounded-3xl my-12 overflow-hidden shadow-2xl relative">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-950/40 via-slate-950 to-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> CINEMATIC ADVENTURES
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Discover the World in a New Way
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Immerse yourself in high-definition video journeys captured by storytellers across the globe.
          </p>
        </div>

        {/* Featured Video + Grid Layout (Image 4 & 5 exact style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Featured Video Spotlight (Image 4 left side) */}
          <div
            onClick={() => setIsVideoModalOpen(true)}
            className="lg:col-span-7 relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80"
              alt="Discover the world in a new way"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-2xl">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            </div>

            {/* Bottom Details */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-widest">
                <Play className="w-3.5 h-3.5 fill-sky-400" /> Watch Featured Story
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                The Whispering Peaks of Rocky Mountain NP
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 italic">
                "The best time to visit Rocky Mountain NP is when the snow is melted and hiking trails are accessible."
              </p>
            </div>
          </div>

          {/* Right Side Video Teaser Thumbnails (Image 4 right side grid) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              More Recommended Journeys
            </h4>
            <div className="space-y-3">
              {videoTeasers.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer group"
                >
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white">
                      {video.duration}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                      {video.title}
                    </h5>
                    <span className="text-[11px] text-slate-400">Click to watch video</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      <Modal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} maxWidth="2xl">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-serif font-bold text-lg text-slate-900">Cinematic Experience</h4>
            <button onClick={() => setIsVideoModalOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Travel Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};
