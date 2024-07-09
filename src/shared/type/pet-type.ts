import { Container } from 'pixi.js';

import { ISkeletonData } from '@pixi-spine/base';
import { ISpineResource } from '@pixi-spine/loader-base';

import { PetLayer } from 'src/sections/component/pet/_layer/pet_layer';
import { BackgroundLayer } from 'src/sections/component/pet/_layer/bg_layer';
import { ApplicationCustom } from 'src/sections/component/pet/_utils/ApplicationCustom';

import { Keys } from '../constain';

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
    rotation?: number;
    speed: number;
  };

export type optionConfigPet = {
  skin: string;
  animation: string;
  scale: number;
};
export type optionConfigBg = {
  scale: number;
};
export type optionConfigProjectile = {
  dame: number;
  image?: string;
};
export type optionProjectileLayerType = optionLayerType & optionConfigProjectile;

export type optionBgLayerType = optionLayerType & optionConfigBg;
export type optionPetLayerType = optionLayerType & optionConfigPet;

export type statsType = {
  skin: string;
  direction: 'right' | 'left';
  scale: number;
  animation: string;
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
