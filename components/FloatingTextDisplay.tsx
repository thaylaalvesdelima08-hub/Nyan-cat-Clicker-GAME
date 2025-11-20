import React from 'react';
import { FloatingText } from '../types';

interface Props {
  items: FloatingText[];
}

const FloatingTextDisplay: React.FC<Props> = ({ items }) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute text-2xl font-bold text-white animate-bounce shadow-sm"
          style={{
            left: item.x,
            top: item.y,
            textShadow: '2px 2px 0 #000',
            animation: 'float 1s ease-out forwards, fadeOut 1s ease-out forwards',
          }}
        >
          {item.text}
        </div>
      ))}
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-100px) scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default FloatingTextDisplay;
