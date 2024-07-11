import { Keys } from 'src/shared/constain';
import { idleType } from 'src/shared/constain/pet-constain';
import uuidv4 from 'src/shared/utils/uuidv4';

export const zindex = {
  pet: 4,
  bg: 0,
};
export const defaultPet = {
  speed: 3,
  animation: idleType[0],
  skin: 'meow',
  zIndex: zindex.pet,
  scale: 1,
};
export const defaultInitPet = {
  position: {
    x: -735,
    y: -650,
  },
  loyalty: 100,
  animation: idleType[0],
  skin: 'meow',
  projectile: [],
  name: 'custom_' + uuidv4(),
  effectGood: [],
  effectBad: [],
  iddle: 'idle',
  customSkin: {},
};

export const moveConfig = {
  [Keys.UP]: {
    x: 0,
    y: 1,
  },
  [Keys.LEFT]: {
    x: 1,
    y: 0,
  },
  [Keys.DOWN]: {
    x: 0,
    y: -1,
  },
  [Keys.RIGHT]: {
    x: -1,
    y: 0,
  },
};
