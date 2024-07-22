import { ISkeletonData } from '@pixi-spine/base';
import { ISpineResource } from '@pixi-spine/loader-base';

import { Keys } from '../constain';
import { number } from 'zod';

export type ActionSever = any;
export type InfoType = {
  id?: string;
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
  idle: string;
};
export type InfoPetType = InfoType & {
  id: number;
};
export type StatsPetType = StatsType & {
  projectileImage: string | number;
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
export type StatsProjectileType = StatsType & {
  velocity: number;
  decay: number;
};
export type VisualsProjectType = {
  image: string | number;
};
export type InfoProjectileType = InfoType & {
  autherId: number;
};
export type KeysType = Keys;
export type DynamicOptionLayer = BaseOptionLayer & StatsType;
export type BaseDeafultLayer = PositionType & AppearanceType & StatsType & ActionLayer;
export type BackgroundOptionLayer = BaseDeafultLayer;
export type ActionLayer = {
  actionServer: ActionSever;
};
export type BaseOptionLayer = PositionType & AppearanceType & InfoType & ActionLayer;
export type PetOptionLayer = ActionLayer & {
  info: InfoPetType;
  stats: StatsPetType;

  appearance: AppearanceType;
  position: PositionType;
  visuals: VisualsPet;
  customSkin?: CustomSkin;
  effect: StatusType[];
  resources: PetContextType;
};
export type PorjectileOptionLayer = BaseDeafultLayer & StatsProjectileType & InfoProjectileType & VisualsProjectType;

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

export type petJson = Omit<PetOptionLayer, 'resources'>;
