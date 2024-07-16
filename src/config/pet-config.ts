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

export const defaultInitPet = {
  position: {
    x: -735,
    y: -650,
  },
  layer: {
    skin: 'meow',
    animation: idleType[0],
    direction: Keys.RIGHT,
    name: 'custom_' + uuidv4(),
    attachSpeed: 10,
    dame: 25,
    speed: 13,
    zIndex: zindex.pet,
    scale: 0.3,
    attackSpeed: 10,
  },
  loyalty: 100,
  effectGood: [],
  effectBad: [],
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
