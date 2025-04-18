// src/components/Player.tsx
import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface PlayerProps {
  rtmpKey: string;
}

const Player: React.FC<PlayerProps> = ({ rtmpKey }) => {
  const videoPlayer = useRef(null);

  useEffect(() => {
    if (videoPlayer.current && rtmpKey) {
      const player = videojs(videoPlayer.current, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        liveui: true,
        sources: [{
          src: `/hls/${rtmpKey}.m3u8`,
          type: 'application/x-mpegURL'
        }]
      });

      player.on('waiting', () => {
        videojs.log('player is waiting');
      });

      player.on('ready', () => {
        videojs.log('player is ready');
      });

      return () => {
        player.dispose();
      };
    }
  }, [videoPlayer, rtmpKey]);

  return (
    <div data-vjs-player>
      <video ref={videoPlayer} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default Player;
