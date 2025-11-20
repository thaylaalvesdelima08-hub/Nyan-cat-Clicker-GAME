import React, { useState, useCallback } from 'react';
import { NYAN_CAT_GIF } from '../constants';

interface ClickerStageProps {
  onClick: (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  rainbows: number;
  gps: number;
}

const ClickerStage: React.FC<ClickerStageProps> = ({ onClick, rainbows, gps }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleStart = () => setIsPressed(true);
  const handleEnd = () => setIsPressed(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-[60vh] w-full overflow-hidden bg-gray-900">
      {/* Starry Background Effect */}
      <div className="absolute inset-0 opacity-50 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(white 1px, transparent 1px)', 
             backgroundSize: '50px 50px' 
           }}>
      </div>
      
      {/* Score Header */}
      <div className="z-10 flex flex-col items-center mt-8 mb-auto">
        <h1 className="font-pixel text-yellow-400 text-4xl md:text-6xl drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
          {Math.floor(rainbows).toLocaleString()}
        </h1>
        <p className="text-white font-bold mt-2 bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
          {gps.toFixed(1)} Rainbows/sec
        </p>
      </div>

      {/* The Clickable Character */}
      <div 
        className={`relative cursor-pointer transition-transform duration-75 select-none z-20 ${isPressed ? 'scale-95' : 'scale-100 animate-float'}`}
        onMouseDown={(e) => { handleStart(); onClick(e); }}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => { handleStart(); onClick(e); }}
        onTouchEnd={handleEnd}
        style={{ touchAction: 'manipulation' }} // Improves tap response on mobile
      >
        {/* Rainbow Trail (Static SVG representation or CSS) */}
        <div className="absolute right-[60%] top-1/2 -translate-y-1/2 w-[200vw] h-16 z-0 opacity-80 rainbow-bg -translate-x-4" />

        {/* Main Nyan Cat */}
        <div className="relative z-10 w-64 h-40 md:w-80 md:h-48">
           {/* Using a reliable pixelated cat image or fallback */}
           <img 
             src={NYAN_CAT_GIF} 
             alt="Nyan Cat"
             className="w-full h-full object-contain pixelated rendering-pixelated"
             draggable={false}
           />

           {/* Party Hat Overlay */}
           <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl filter drop-shadow-lg transform -rotate-12">
             🥳
           </div>

           {/* Hello Kitty Bear Overlay */}
           <div className="absolute -bottom-2 left-4 text-5xl filter drop-shadow-lg transform -rotate-12 z-20">
             🧸
           </div>
           <div className="absolute bottom-6 left-8 text-2xl z-30">
             🎀
           </div>
        </div>
      </div>

      <div className="mt-auto mb-4 text-white/50 text-xs">
        Tap the cat!
      </div>
    </div>
  );
};

export default ClickerStage;
