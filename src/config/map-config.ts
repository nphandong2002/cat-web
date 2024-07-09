import { battleZonesData, charactersMapData, collisions } from 'src/shared/constain/map-constain';

export const collisionsMap = (() => {
  let a = [];
  for (let i = 0; i < collisions.length; i += 100) {
    a.push(collisions.slice(i, 100 + i));
  }
  return a;
})();
export const battleZonesMap = (() => {
  let a = [];
  for (let i = 0; i < battleZonesData.length; i += 100) {
    a.push(battleZonesData.slice(i, 100 + i));
  }
  return a;
})();

export const charactersMap = (() => {
  let a = [];
  for (let i = 0; i < charactersMapData.length; i += 100) {
    a.push(charactersMapData.slice(i, 100 + i));
  }
  return a;
})();
