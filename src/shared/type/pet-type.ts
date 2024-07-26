import { ISkeletonData } from '@pixi-spine/base';
import { ISpineResource } from '@pixi-spine/loader-base';

import { ActionServerType, BaseLayerType, InfoLayerType } from './baselayer-type';

import { Keys } from '../constain';

export type StatsLayerType = {
  speed: number;
  dame: number;
  attackSpeed: number;
};

export type KeysType = Keys;
//
export type DynamicOptionLayer = BaseLayerType & {
  stats: StatsLayerType;
  status: StatusType;
};

export type VisualsPet = {
  skin: string;
  animation: string;
  direction: Keys;
  idle: string;
};
// pet layer
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
export type StatsPetType = StatsLayerType & {
  projectileImage: number;
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
export type PetOptionLayer = DynamicOptionLayer & {
  stats: StatsPetType;
  customSkin?: CustomSkin;
  visual: VisualsPet;
  status: StatusType;
  resources: PetContextType;
  updateCurrentPet: ActionServerType['updateCurrentPet'];
};

//projectile
export type StatsProjectileType = StatsLayerType & {
  velocity: number;
  decay: number;
};
export type VisualsProjectType = {
  image: number;
};
export type InfoProjectileType = InfoLayerType & {
  autherId: number;
};

export type PorjectileOptionLayer = DynamicOptionLayer & {
  info: InfoProjectileType;
  stats: StatsProjectileType;
  visual: VisualsProjectType;
};

export type PetContextType = {
  cat: ISpineResource<ISkeletonData>;
};

//liveblock
export type petJson = Omit<PetOptionLayer, 'resources'>;
