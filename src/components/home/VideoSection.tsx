import React, { useState } from 'react';
import { VideoSectionConfig, PageRoute, CompanySettings } from '../../types';
import { createWhatsAppChatUrl } from '../../services/whatsapp';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  X,
  ExternalLink,
} from 'lucide-react';

interface VideoSectionProps {
  config: VideoSectionConfig;
  settings: CompanySettings;
  onNavigate: (page: PageRoute) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  config,
  settings,
  onNavigate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  if (!config.enabled) {
    return null;
  }

  const whatsappUrl = createWhatsAppChatUrl(
    settings.whatsappNumber,
    `Hello ${settings.name}, I just watched your craftsmanship video showcase and would like to enquire about custom curtains and blinds for my space in Abuja.`
  );

  // Helper to extract YouTube video ID
  const getYouTubeEmbedUrl = (url: string): string | null => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1`;
      }
    } catch {
      // fallback
    }
    return null;
  };

  // Helper to extract Vimeo video ID
  const getVimeoEmbedUrl = (url: string): string | null => {
    try {
      const match = url.match(/(?:vimeo)\.com.*(?:videos\/|video\/|channels\/|)\/?([0-9]+)/);
      if (match && match[1]) {
        return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
      }
    } catch {
      // fallback
    }
    return null;
  };

  const youtubeUrl = getYouTubeEmbedUrl(config.videoUrl);
  const vimeoUrl = getVimeoEmbedUrl(config.videoUrl);
  const isEmbed = Boolean(youtubeUrl || vimeoUrl);
  const embedUrl = youtubeUrl || vimeoUrl;

  const handlePlayClick = () => {
    if (isEmbed) {
      setIsModalOpen(true);
    } else {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Fallback if browser autoplay policy blocks
        });
      }
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleCtaClick = () => {
    if (config.ctaButtonLink === 'whatsapp') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(config.ctaButtonLink as PageRoute);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#3B261D] text-white relative overflow-hidden">
      {/* Decorative luxury architectural background accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A45C]/50 to-transparent" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C9A45C]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#C9A45C]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#C9A45C]/40 mb-4 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E6D1A0]" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#E6D1A0]">
              {config.badge}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight text-balance">
            {config.title}
          </h2>

          {config.subtitle && (
            <p className="font-serif text-lg sm:text-xl text-[#E6D1A0] mt-3 font-light">
              {config.subtitle}
            </p>
          )}

          <p className="text-sm sm:text-base text-[#FAF7F2]/85 mt-4 leading-relaxed max-w-2xl mx-auto font-light">
            {config.description}
          </p>
        </div>

        {/* Video Showcase Card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-black border-2 border-[#C9A45C]/50 shadow-2xl group">
            {/* Aspect ratio container (16:9) */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#2A1A13]">
              {isEmbed ? (
                <>
                  {/* Poster view for embed videos */}
                  <img
                    src={config.posterImageUrl}
                    alt={config.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                  {/* Play overlay button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <button
                      onClick={handlePlayClick}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E6D1A0] hover:bg-[#C9A45C] text-[#3B261D] flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-[0_0_35px_rgba(201,164,92,0.6)] cursor-pointer"
                      aria-label="Play video"
                    >
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1.5 fill-current" />
                    </button>
                    <span className="mt-4 text-xs sm:text-sm uppercase tracking-widest font-bold text-white drop-shadow-md">
                      Watch Video Showcase
                    </span>
                    {config.durationNote && (
                      <span className="mt-1 text-xs text-[#E6D1A0]/90 font-mono">
                        {config.durationNote}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Direct HTML5 Video */}
                  <video
                    ref={videoRef}
                    src={config.videoUrl}
                    poster={config.posterImageUrl}
                    controls={isPlaying}
                    playsInline
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* Play overlay when paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 flex flex-col items-center justify-center">
                      <button
                        onClick={handlePlayClick}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E6D1A0] hover:bg-[#C9A45C] text-[#3B261D] flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-[0_0_35px_rgba(201,164,92,0.6)] cursor-pointer"
                        aria-label="Play video"
                      >
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1.5 fill-current" />
                      </button>
                      <span className="mt-4 text-xs sm:text-sm uppercase tracking-widest font-bold text-white drop-shadow-md">
                        Watch Full Video
                      </span>
                      {config.durationNote && (
                        <span className="mt-1 text-xs text-[#E6D1A0]/90 font-mono">
                          {config.durationNote}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Inline controls when playing */}
                  {isPlaying && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-xs p-1.5 rounded-lg border border-white/20">
                      <button
                        onClick={handleToggleMute}
                        className="p-1.5 text-white hover:text-[#E6D1A0] transition-colors"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-1.5 text-white hover:text-[#E6D1A0] transition-colors"
                        aria-label="Expand video"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Video footer bar */}
            <div className="p-6 bg-[#2A1A13] border-t border-[#C9A45C]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#C9A45C] animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-[#FAF7F2]">
                  Filmed in Abuja Residences & Showroom
                </span>
                {config.durationNote && (
                  <span className="text-xs text-[#E6D1A0]/70 font-mono hidden md:inline">
                    • {config.durationNote}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCtaClick}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#3B261D] bg-[#E6D1A0] hover:bg-[#C9A45C] transition-all rounded-lg cursor-pointer flex items-center gap-2 active:scale-95 shadow-xs"
                >
                  {config.ctaButtonText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white border border-[#C9A45C]/80 hover:bg-white/10 transition-all rounded-lg cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#25D366]" viewBox="0 0 24 24">
                    <path d="M17.507 14.307l-.009.075c-.239.987-1.18 1.802-2.193 1.902-.656.065-1.503-.024-3.072-.676-2.008-.834-3.513-2.613-4.468-4.108-.946-1.482-1.04-2.457-.962-2.923.109-.643.529-1.229 1.053-1.492.315-.158.64-.202.909-.202.261 0 .493.011.666.027.202.019.417.061.593.473.197.461.674 1.638.733 1.758.059.12.099.261.02.418-.079.157-.118.256-.236.395-.118.139-.249.311-.355.417-.119.119-.243.249-.105.486.138.237.615 1.014 1.32 1.642.908.809 1.674 1.06 1.912 1.178.238.118.377.099.516-.06.139-.158.594-.693.752-.931.158-.238.317-.198.535-.118.218.079 1.385.653 1.623.772.238.119.396.178.455.277.059.099.059.574-.18 1.561zM12.04 2C6.518 2 2.03 6.476 2.03 11.986c0 1.954.567 3.779 1.554 5.327L2 22l4.832-1.557c1.482.88 3.208 1.388 5.208 1.388 5.522 0 10.01-4.476 10.01-9.986C22.05 6.476 17.562 2 12.04 2z" />
                  </svg>
                  {config.secondaryCtaText || 'Chat on WhatsApp'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights feature cards */}
        {config.highlights && config.highlights.length > 0 && (
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.highlights.map((highlight, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[#FAF7F2]/5 border border-[#E6D1A0]/20 backdrop-blur-xs flex items-start gap-3 hover:border-[#E6D1A0]/50 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-[#C49A43] shrink-0 mt-0.5" />
                <span className="text-xs text-[#FAF7F2] font-normal leading-relaxed">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Player (for YouTube, Vimeo, or Fullscreen view) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-[#1E1510] rounded-2xl overflow-hidden border border-[#E6D1A0]/40 shadow-2xl">
            {/* Modal close button */}
            <div className="flex items-center justify-between p-4 bg-[#251A15] border-b border-[#E6D1A0]/20">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#E6D1A0] font-semibold">
                  {config.badge}
                </span>
                <span className="text-xs text-white/60">• {config.title}</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video frame container */}
            <div className="relative aspect-video w-full bg-black">
              {isEmbed && embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={config.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={config.videoUrl}
                  poster={config.posterImageUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
