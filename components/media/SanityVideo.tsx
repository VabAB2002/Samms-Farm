'use client';

import React from 'react';
import { urlFor } from '@/lib/sanity/client';

type SanityVideoProps = {
  video?: any; // For directly uploaded videos
  videoUrl?: string; // For external URLs (YouTube, Vimeo, etc.)
  title: string;
  poster?: any; // Optional thumbnail image
  width?: string;
  height?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
};

export default function SanityVideo({
  video,
  videoUrl,
  title,
  poster,
  width = '100%',
  height = 'auto',
  className = '',
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true
}: SanityVideoProps) {
  // Handle YouTube videos
  const isYouTube = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be');
  const isVimeo = videoUrl?.includes('vimeo.com');
  
  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  // Extract Vimeo video ID
  const getVimeoId = (url: string) => {
    const regExp = /vimeo\.com\/(?:video\/|)?(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };
  
  // Add rustic styling based on the farm aesthetic memory
  const rusticClasses = 'rounded-lg shadow-md border border-amber-100 overflow-hidden';
  const combinedClasses = `${rusticClasses} ${className}`;

  if (isYouTube && videoUrl) {
    const youtubeId = getYouTubeId(videoUrl);
    
    return (
      <div className={combinedClasses} style={{ width, height: 'auto', aspectRatio: '16/9' }}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&controls=${controls ? 1 : 0}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  
  if (isVimeo && videoUrl) {
    const vimeoId = getVimeoId(videoUrl);
    
    return (
      <div className={combinedClasses} style={{ width, height: 'auto', aspectRatio: '16/9' }}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=${autoPlay ? 1 : 0}&loop=${loop ? 1 : 0}&muted=${muted ? 1 : 0}`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        ></iframe>
      </div>
    );
  }
  
  // For directly uploaded videos or other video URLs
  return (
    <div className={combinedClasses} style={{ width }}>
      <video
        src={video ? urlFor(video).url() : videoUrl}
        poster={poster ? urlFor(poster).url() : undefined}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        style={{ width: '100%', height }}
        title={title}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
