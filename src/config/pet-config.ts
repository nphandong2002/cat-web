import { Keys } from 'src/shared/constants/constants';
import { idleType } from 'src/shared/constants/pet-constants';

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
