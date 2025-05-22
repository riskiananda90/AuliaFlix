import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Rewind, FastForward, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  poster: string;
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ poster, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          togglePlay();
          break;
        case 'ArrowRight':
          skip(10);
          break;
        case 'ArrowLeft':
          skip(-10);
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  useEffect(() => {
    if (playerRef.current && isPlaying) {
      clearTimeout(controlsTimeout.current!);
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
      } else {
        document.exitFullscreen().then(() => setIsFullscreen(false));
      }
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      const newTime = (parseInt(e.target.value) / 100) * playerRef.current.duration;
      playerRef.current.currentTime = newTime;
      setProgress(parseInt(e.target.value));
    }
  };

  const skip = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime += seconds;
    }
  };

  return (
    <motion.div 
      ref={playerRef}
      className="relative w-full aspect-video bg-black rounded-md overflow-hidden"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        playing={isPlaying} // Use playing prop to control play/pause
        volume={volume}
        muted={isMuted}
        playbackRate={playbackSpeed}
        style={{ position: 'absolute', top: 0, left: 0 }}
        onProgress={({ played }) => setProgress(played * 100)}
      />
      

      <AnimatePresence>
        {(!isPlaying || showControls) && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-white text-sm">
                  {formatTime(progress / 100 * playerRef.current?.duration || 0)}
                </span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={progress} 
                  onChange={seek}
                  className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600"
                />
                <span className="text-white text-sm">
                  {playerRef.current ? formatTime(playerRef.current.duration) : '00:00'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button 
                    onClick={togglePlay} 
                    className="text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </motion.button>

                  <motion.button 
                    onClick={() => skip(-10)} 
                    className="text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Rewind size={24} />
                  </motion.button>

                  <motion.button 
                    onClick={() => skip(10)} 
                    className="text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FastForward size={24} />
                  </motion.button>

                  <div className="relative">
                    <motion.button 
                      onClick={toggleMute}
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      onMouseLeave={() => setShowVolumeSlider(false)}
                      className="text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </motion.button>

                    <AnimatePresence>
                      {showVolumeSlider && (
                        <motion.div 
                          className="absolute left-0 bottom-full mb-2 bg-black/80 p-2 rounded"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-24 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <motion.button 
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Settings size={24} />
                  </motion.button>

                  <AnimatePresence>
                    {showSettings && (
                      <motion.div 
                        className="absolute right-0 bottom-full mb-2 bg-black/80 rounded overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <div className="p-2">
                          <p className="text-white text-sm mb-2">Kecepatan Putar</p>
                          {[0.5, 1, 1.5, 2].map(speed => (
                            <button
                              key={speed}
                              onClick={() => setPlaybackSpeed(speed)}
                              className={`block w-full text-left px-4 py-1 text-sm ${
                                playbackSpeed === speed ? 'text-red-500' : 'text-white'
                              } hover:bg-white/10`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button 
                  onClick={toggleFullscreen} 
                  className="text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoPlayer;
