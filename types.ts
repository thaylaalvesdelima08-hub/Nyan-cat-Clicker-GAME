export interface Upgrade {
  id: string;
  name: string;
  baseCost: number;
  basePower: number;
  type: 'auto' | 'click';
  icon: string;
  count: number;
  description: string;
}

export interface GameState {
  rainbows: number;
  clickCount: number;
  startTime: number;
}

export interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
}
