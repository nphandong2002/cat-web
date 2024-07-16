import { ISkeletonData } from '@pixi-spine/base';
import { ISpineResource } from '@pixi-spine/loader-base';

import { Keys } from '../constain';

export type InfoType = {
  name: string;
  loyalty: number;
};
export type AppearanceType = {
  height?: number;
  width?: number;
  zIndex: number;
  scale: number;
};

export type StatsType = {
  speed: number;
  dame: number;
  attackSpeed: number;
};
export type PositionType = {
  x: number;
  y: number;
};
export type VisualsPet = {
  skin: string;
  animation: string;
  direction: Keys;
};
export type CustomSkin = Partial<{
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
export type KeysType = Keys;
export type BaseOptionLayer = PositionType & AppearanceType & InfoType & StatsType;
export type BackgroundOptionLayer = PositionType & AppearanceType;
export type PetOptionLayer = {
  info: InfoType;
  stats: StatsType;

  appearance: AppearanceType;
  position: PositionType;
  visuals: VisualsPet;
  customSkin: CustomSkin;
  effect: StatusType[];
};

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

//liveblock

export type petJson = {
  position: { x: number; y: number };
  loyalty: number;
  layer: BaseOptionLayer;
  effectGood: EffectGoodType[];
  effectBad: EffectBadType[];
  customSkin: CustomSkin;
};
