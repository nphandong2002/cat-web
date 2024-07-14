import { Container } from 'pixi.js';

import { ISkeletonData } from '@pixi-spine/base';
import { ISpineResource } from '@pixi-spine/loader-base';

import { PetLayer } from 'src/sections/component/pet/_layer/pet_layer';
import { BackgroundLayer } from 'src/sections/component/pet/_layer/bg_layer';
import { ApplicationCustom } from 'src/sections/component/pet/_utils/ApplicationCustom';

import { Keys } from '../constain';
import { BaseLayer } from 'src/sections/component/pet/_layer/base_layer';

export type resourcesType = {
  cat: ISpineResource<ISkeletonData>;
};
export type viewportType = {
  height: number;
  width: number;
};
export type positionType = {
  x: number;
  y: number;
};
export type optionLayerType = Partial<viewportType> &
  Partial<positionType> & {
    zIndex: number;
    zOrder?: number;
    speed: number;
  };

export type optionConfigPet = {
  skin: string;
  animation: string;
  scale: number;
  dame: number;
  attackSpeed: number;
  name: string;
};
export type optionConfigBg = {
  scale: number;
};
export type optionConfigProjectile = {
  dame: number;
  velocity: positionType;
  image: string | number;
  decay: number;
  speed: number;
};
export type optionProjectileLayerType = optionLayerType & optionConfigProjectile;

export type optionBgLayerType = optionLayerType & optionConfigBg;
export type optionPetLayerType = optionLayerType & optionConfigPet;

export type statsType = {
  skin: string;
  direction: Keys;
  scale: number;
  animation: string;
  dame: number;
  attackSpeed: number;
  projectileImage: number | string;
};
export type renderManagerType = Partial<{
  app: ApplicationCustom;
  resources: resourcesType;
  layer: {
    bgLayer: BackgroundLayer;
    petLayer: PetLayer;
  };
}>;

export type listContainerType = Container[];

export type KeysType = Keys;

export type PetContextType = {
  cat: ISpineResource<ISkeletonData>;
};

export type effectType = {
  type: string;
  time: number;
  dame: number;
  incremental?: boolean;
};
export type effectGoodType = effectType & {
  acceleration: boolean;
};
export type effectBadType = effectType & {
  notMove: boolean;
  stunned: boolean;
  die: boolean;
};
export type statusType = (effectGoodType | effectBadType)[];
//liveblock
export type projectileJson = positionType & optionConfigProjectile;
export type petJson = optionConfigPet & {
  position: positionType;
  loyalty: number;
  animation: string;
  projectile: projectileJson[];
  effectGood: effectGoodType[];
  effectBad: effectBadType[];
  iddle: string;
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
