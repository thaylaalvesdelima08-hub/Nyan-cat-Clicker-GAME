import React from 'react';
import { Upgrade } from '../types';

interface UpgradeMenuProps {
  upgrades: Upgrade[];
  rainbows: number;
  onBuy: (upgradeId: string) => void;
}

const UpgradeMenu: React.FC<UpgradeMenuProps> = ({ upgrades, rainbows, onBuy }) => {
  const calculateCost = (base: number, count: number) => Math.floor(base * Math.pow(1.15, count));

  return (
    <div className="flex-1 bg-slate-800 border-t-4 border-indigo-500 overflow-y-auto pb-20 px-4 pt-4">
      <h2 className="font-pixel text-white text-lg mb-4 text-center">Party Store</h2>
      <div className="space-y-3 max-w-md mx-auto">
        {upgrades.map((upgrade) => {
          const cost = calculateCost(upgrade.baseCost, upgrade.count);
          const canAfford = rainbows >= cost;

          return (
            <button
              key={upgrade.id}
              onClick={() => onBuy(upgrade.id)}
              disabled={!canAfford}
              className={`
                w-full flex items-center p-3 rounded-xl border-b-4 transition-all duration-100 active:border-b-0 active:translate-y-1
                ${canAfford 
                  ? 'bg-white border-gray-300 hover:bg-gray-50' 
                  : 'bg-gray-600 border-gray-800 opacity-70 cursor-not-allowed'}
              `}
            >
              <div className="text-4xl mr-4 bg-indigo-100 p-2 rounded-lg">{upgrade.icon}</div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center">
                  <span className={`font-bold ${canAfford ? 'text-gray-800' : 'text-gray-300'}`}>
                    {upgrade.name}
                  </span>
                  <span className="font-pixel text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                    Lvl {upgrade.count}
                  </span>
                </div>
                <div className={`text-xs mt-1 ${canAfford ? 'text-gray-600' : 'text-gray-400'}`}>
                  {upgrade.description}
                </div>
              </div>
              <div className="ml-3 flex flex-col items-end min-w-[60px]">
                 <span className={`font-bold text-sm ${canAfford ? 'text-green-600' : 'text-red-300'}`}>
                   🌈 {cost.toLocaleString()}
                 </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradeMenu;
