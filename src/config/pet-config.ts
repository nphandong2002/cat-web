import { idleType } from "src/shared/constants/pet-constants";

export const zindex = {
  pet: 4,
  bg: 0,
};
export const defaultPet = {
  speed: 3,
  animation: idleType[0],
  skin: "meow",
  zIndex: zindex.pet,
  scale: 1 
};
