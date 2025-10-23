import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ExternalLink } from 'lucide-react';

const VideoEmbed = ({
  // Video configuration
  videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  platform = "auto", // 'auto', 'youtube', 'vimeo'
  
  // Display options
  title = "Video Title",
  description = "Video description",
  showTitle = true,
  showDescription = true,
  
  // Aspect ratio control
  aspectRatio = "16:9", // '16:9', '4:3', 'square', 'auto'
  
  // Overlay thumbnail
  showThumbnail = true,
  thumbnailImage = null,
  playButtonSize = "large", // 'small', 'medium', 'large'
  playButtonColor = "text-white",
  
  // Video controls
  autoplay = false,
  muted = true,
  loop = false,
  showControls = true,
  autoPause = false,
  
  // Styling options
  backgroundColor = "bg-gray-900",
  borderRadius = "rounded-lg",
  shadow = "shadow-lg",
  
  // Layout options
  containerMaxWidth = "max-w-4xl",
  padding = "py-8 px-4 sm:px-6 lg:px-8",
  className = ""
}) => {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [showOverlay, setShowOverlay] = useState(true);
  const [videoId, setVideoId] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState('youtube');
  const iframeRef = useRef(null);
  
  // Extract video ID and detect platform
  useEffect(() => {
    const extractVideoInfo = (url) => {
      let videoId = '';
      let platform = 'youtube';
      
      if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
        if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        } else {
          videoId = url.split('v=')[1].split('&')[0];
        }
        platform = 'youtube';
      } else if (url.includes('vimeo.com/')) {
        videoId = url.split('vimeo.com/')[1].split('?')[0];
        platform = 'vimeo';
      }
      
      return { videoId, platform };
    };
    
    const { videoId: extractedId, platform: detected } = extractVideoInfo(videoUrl);
    setVideoId(extractedId);
    setDetectedPlatform(platform === 'auto' ? detected : platform);
  }, [videoUrl, platform]);
  
  // Get aspect ratio classes
  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case '4:3':
        return 'aspect-[4/3]';
      case 'square':
        return 'aspect-square';
      case 'auto':
        return 'aspect-auto';
      default:
        return 'aspect-video'; // 16:9
    }
  };
  
  // Get play button size
  const getPlayButtonSize = () => {
    switch (playButtonSize) {
      case 'small':
        return 'w-12 h-12';
      case 'medium':
        return 'w-16 h-16';
      case 'large':
        return 'w-20 h-20';
      default:
        return 'w-16 h-16';
    }
  };
  
  // Get embed URL
  const getEmbedUrl = () => {
    const autoplayParam = autoplay ? '&autoplay=1' : '';
    const muteParam = muted ? '&mute=1' : '';
    const loopParam = loop ? '&loop=1' : '';
    const controlsParam = showControls ? '&controls=1' : '&controls=0';
    
    if (detectedPlatform === 'youtube') {
      return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0${autoplayParam}${muteParam}${loopParam}${controlsParam}`;
    } else if (detectedPlatform === 'vimeo') {
      return `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}&muted=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&controls=${showControls ? 1 : 0}`;
    }
    return '';
  };
  
  // Handle play button click
  const handlePlay = () => {
    setIsPlaying(true);
    setShowOverlay(false);
  };
  
  // Handle pause
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  // Handle mute toggle
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };
  
  // Handle fullscreen
  const handleFullscreen = () => {
    if (iframeRef.current) {
      iframeRef.current.requestFullscreen();
    }
  };
  
  // Auto-pause functionality
  useEffect(() => {
    if (autoPause && iframeRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && isPlaying) {
              // Pause video when out of view
              handlePause();
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(iframeRef.current);
      return () => observer.disconnect();
    }
  }, [autoPause, isPlaying]);
  
  // Get thumbnail image
  const getThumbnailImage = () => {
    if (thumbnailImage) {
      return thumbnailImage;
    }
    
    if (detectedPlatform === 'youtube') {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } else if (detectedPlatform === 'vimeo') {
      return `https://vumbnail.com/${videoId}.jpg`;
    }
    
    return null;
  };
  
  const renderOverlay = () => {
    if (!showOverlay || !showThumbnail) return null;
    
    return (
      <div 
        className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer group"
        onClick={handlePlay}
      >
        {/* Thumbnail Image */}
        {getThumbnailImage() && (
          <div className="absolute inset-0">
            <img
              src={getThumbnailImage()}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}
        
        {/* Play Button */}
        <div className="relative z-10 flex items-center justify-center">
          <div className={`${getPlayButtonSize()} ${playButtonColor} bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-200 group-hover:scale-110`}>
            <Play className="w-8 h-8 ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
    );
  };
  
  const renderVideoInfo = () => {
    if (!showTitle && !showDescription) return null;
    
    return (
      <div className="my-4 px-4">
        {showTitle && title && (
          <h3 className="text-xl font-semibold text-white mb-2">
            {title}
          </h3>
        )}
        {showDescription && description && (
          <p className="text-gray-300 text-sm">
            {description}
          </p>
        )}
      </div>
    );
  };
  
  const renderVideoControls = () => {
    if (!showControls) return null;
    
    return (
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={handleMuteToggle}
          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <button
          onClick={handleFullscreen}
          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
          aria-label="Fullscreen"
        >
          <Maximize className="w-4 h-4" />
        </button>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
          aria-label="Open in new tab"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  };
  
  return (
    <div className={`${containerMaxWidth} mx-auto ${padding} ${className}`}>
      <div className={`relative ${backgroundColor} ${borderRadius} ${shadow} overflow-hidden`}>
        {/* Video Container */}
        <div className={`relative ${getAspectRatioClasses()}`}>
          {/* Video Iframe */}
          {videoId && (
            <iframe
              ref={iframeRef}
              src={getEmbedUrl()}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          
          {/* Overlay Thumbnail */}
          {renderOverlay()}
          
          {/* Video Controls */}
          {renderVideoControls()}
        </div>
        
        {/* Video Info */}
        {renderVideoInfo()}
      </div>
    </div>
  );
};

export default VideoEmbed;
