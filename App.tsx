import React, { useState, useEffect, useCallback } from 'react';
import ClickerStage from './components/ClickerStage';
import UpgradeMenu from './components/UpgradeMenu';
import FloatingTextDisplay from './components/FloatingTextDisplay';
import NyanAssistant from './components/NyanAssistant';
import { INITIAL_UPGRADES } from './constants';
import { Upgrade, FloatingText } from './types';

const App: React.FC = () => {
  const [rainbows, setRainbows] = useState<number>(0);
  const [lifetimeRainbows, setLifetimeRainbows] = useState<number>(0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(INITIAL_UPGRADES);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  // Game Loop for Auto Clickers
  useEffect(() => {
    const autoGainsPerSecond = upgrades.reduce((acc, u) => {
      return u.type === 'auto' ? acc + (u.basePower * u.count) : acc;
    }, 0);

    if (autoGainsPerSecond === 0) return;

    const interval = setInterval(() => {
      const gains = autoGainsPerSecond / 10; // Update 10 times a second for smoothness
      setRainbows(prev => prev + gains);
      setLifetimeRainbows(prev => prev + gains);
    }, 100);

    return () => clearInterval(interval);
  }, [upgrades]);

  const getClickPower = useCallback(() => {
    const baseClick = 1;
    const bonusClick = upgrades.reduce((acc, u) => {
      return u.type === 'click' ? acc + (u.basePower * u.count) : acc;
    }, 0);
    return baseClick + bonusClick;
  }, [upgrades]);

  const handleBuy = (upgradeId: string) => {
    setUpgrades(prev => prev.map(u => {
      if (u.id !== upgradeId) return u;
      const cost = Math.floor(u.baseCost * Math.pow(1.15, u.count));
      if (rainbows >= cost) {
        setRainbows(curr => curr - cost);
        return { ...u, count: u.count + 1 };
      }
      return u;
    }));
  };

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent default behavior if needed for touch
    // e.preventDefault(); // Be careful with this on inputs, but fine for game stage area generally
    
    const power = getClickPower();
    setRainbows(prev => prev + power);
    setLifetimeRainbows(prev => prev + power);

    // Floating Text Logic
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    // Add random offset
    const id = Date.now();
    const offset = (Math.random() - 0.5) * 40;
    
    setFloatingTexts(prev => [
      ...prev, 
      { id, x: clientX + offset, y: clientY - 50, text: `+${power}` }
    ]);

    // Cleanup old floating texts
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(ft => ft.id !== id));
    }, 1000);
  };

  const calculateGPS = () => {
    return upgrades.reduce((acc, u) => u.type === 'auto' ? acc + (u.basePower * u.count) : acc, 0);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 overflow-hidden">
      {/* Mobile-first layout: Clicker on top (60%), Upgrades on bottom (40%) */}
      
      <ClickerStage 
        onClick={handleClick} 
        rainbows={rainbows} 
        gps={calculateGPS()} 
      />

      <UpgradeMenu 
        upgrades={upgrades} 
        rainbows={rainbows} 
        onBuy={handleBuy} 
      />

      <FloatingTextDisplay items={floatingTexts} />
      
      <NyanAssistant currentScore={Math.floor(lifetimeRainbows)} />
    </div>
  );
};

export default App;
