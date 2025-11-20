import { Upgrade } from './types';

export const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'milk',
    name: 'Warm Milk',
    baseCost: 15,
    basePower: 1,
    type: 'auto',
    icon: '🥛',
    count: 0,
    description: 'Auto-generates +1 rainbow/sec',
  },
  {
    id: 'cursor',
    name: 'Rainbow Cursor',
    baseCost: 50,
    basePower: 2,
    type: 'click',
    icon: '👆',
    count: 0,
    description: '+2 rainbows per click',
  },
  {
    id: 'toptart',
    name: 'Extra Pop-tart',
    baseCost: 250,
    basePower: 10,
    type: 'auto',
    icon: '🥮',
    count: 0,
    description: 'Tasty snacks give +10 rainbows/sec',
  },
  {
    id: 'party_hats',
    name: 'Party Hats',
    baseCost: 1000,
    basePower: 50,
    type: 'auto',
    icon: '🥳',
    count: 0,
    description: 'More party vibes! +50 rainbows/sec',
  },
  {
    id: 'kitty_friends',
    name: 'Kitty Friends',
    baseCost: 5000,
    basePower: 200,
    type: 'auto',
    icon: '🐱',
    count: 0,
    description: 'Invite friends! +200 rainbows/sec',
  },
];

export const NYAN_CAT_GIF = "https://media.tenor.com/2roX3uxz_68AAAAM/cat-space.gif"; // Reliable classic nyan
