
import React, { useState, useEffect } from 'react';
import Hls from 'hls.js';

const Hero = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoUrl = 'https://stream.mux.com/Q2jS4kCwTQKLCga2aBSJuZYozrHpTaJ7RvLQ9h2nWG8.m3u8';
  const fallbackImageUrl = 'https://images.unsplash.com/photo-1518770660439-4636190af475';
  
  useEffect(() => {
    const videoElement = document.getElementById('hero-video') as HTMLVideoElement;
    
    if (videoElement) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoElement);
        
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            setVideoFailed(true);
            hls.destroy();
          }
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari which has native HLS support
        videoElement.src = videoUrl;
        videoElement.onerror = () => setVideoFailed(true);
      } else {
        // Video format not supported, fallback to image
        setVideoFailed(true);
      }
    }
    
    return () => {
      // Cleanup
      const videoElement = document.getElementById('hero-video') as HTMLVideoElement;
      if (videoElement) {
        videoElement.pause();
        videoElement.src = '';
        videoElement.load();
      }
    };
  }, []);

  const scrollToTeam = () => {
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center bg-raven-black">
      <div className="absolute inset-0 bg-gradient-to-b from-raven-black/50 to-raven-black/70 z-10"></div>
      
      {/* Background video or image */}
      <div className="absolute inset-0 overflow-hidden">
        {!videoFailed ? (
          <video 
            id="hero-video"
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          ></video>
        ) : (
          <img 
            src={fallbackImageUrl}
            alt="Background" 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="container z-20 px-4 text-center flex flex-col items-center mt-60">
        <p className="mx-auto max-w-2xl text-xl leading-relaxed md:text-2xl">
          Advancing unmanned systems through hands-on student projects.
        </p>
      </div>
    </section>
  );
};

export default Hero;
