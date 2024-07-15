import { ISkeletonData } from '@pixi-spine/base';
import { ISpineResource } from '@pixi-spine/loader-base';

import { Keys } from '../constain';

export type ViewportType = {
  height?: number;
  width?: number;
  zIndex: number;
  scale: number;
};
export type PrototypeLayer = {
  name: string;
  speed: number;
  dame: number;
  attackSpeed: number;
};
export type KeysType = Keys;
export type BaseOptionLayer = Partial<{ x: number; y: number }> & ViewportType & PrototypeLayer;

export type ViewLayerPet = {
  skin: string;
  animation: string;
  direction: Keys;
};
export type PetOptionLayer = BaseOptionLayer & ViewLayerPet;

export type EffectType = {
  type: string;
  time: number;
  dame: number;
  incremental?: boolean;
};

export type EffectGoodType = EffectType & {
  acceleration: boolean;
};
export type EffectBadType = EffectType & {
  notMove: boolean;
  stunned: boolean;
  die: boolean;
};
export type StatusType = (EffectGoodType | EffectBadType)[];

export type PetContextType = {
  cat: ISpineResource<ISkeletonData>;
};

export type ProjectileProtype = PrototypeLayer & {
  velocity: { x: number; y: number };
  image: string | number;
  decay: number;
};
//liveblock
export type mapData = {
  projectile: ProjectileProtype[];
};
export type petJson = {
  position: { x: number; y: number };
  loyalty: number;
  layer: BaseOptionLayer;
  effectGood: EffectGoodType[];
  effectBad: EffectBadType[];
  customSkin: Partial<{
    eyes: string;
    hat: string;
    glasses: string;
    mask: string;
    wings: string;
    costume: string;
    faceMask: string;
    companion: string;
    rod: string;
  }>;
};
