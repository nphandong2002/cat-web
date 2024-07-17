import { Keys } from 'src/shared/constain';
import { idleType } from 'src/shared/constain/pet-constain';
import uuidv4 from 'src/shared/utils/uuidv4';

export const defaultApplication = {
  backgroundColor: '#fff',
  backgroundAlpha: 0,
  clearBeforeRender: true,
  context: null,
  antialias: true,
  powerPreference: 'default',
  premultipliedAlpha: true,
  preserveDrawingBuffer: true,
  hello: true,
};
export const zindex = {
  projectile: 2,
  pet: 1,
  bg: 0,
};
export const DefaultData = {
  dame: {
    pet: 25,
  },
  speed: {
    pet: 13,
  },
  attackSpeed: {
    pet: 10,
  },
  scale: {
    pet: 0.3,
  },
  loyalty: {
    pet: 100,
  },
  position: {
    pet: {
      x: 1240,
      y: 900,
    },
  },
};

export const DefaultInitPet = {
  position: DefaultData.position.pet,
  info: {
    name: 'custom_' + uuidv4(),
    loyalty: DefaultData.loyalty.pet,
  },
  stats: {
    dame: DefaultData.dame.pet,
    speed: DefaultData.speed.pet,
    attackSpeed: DefaultData.attackSpeed.pet,
  },

  appearance: {
    zIndex: zindex.pet,
    scale: DefaultData.scale.pet,
  },
  visuals: {
    skin: 'meow',
    animation: idleType[0],
    direction: Keys.RIGHT,
  },
  effect: [],
};

export const moveConfig = {
  [Keys.UP]: {
    x: 0,
    y: -1,
  },
  [Keys.LEFT]: {
    x: -1,
    y: 0,
  },
  [Keys.DOWN]: {
    x: 0,
    y: 1,
  },
  [Keys.RIGHT]: {
    x: 1,
    y: 0,
  },
};
