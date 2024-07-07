import { Container } from "pixi.js";

import { ISkeletonData } from "@pixi-spine/base";
import { ISpineResource } from "@pixi-spine/loader-base";
import { ApplicationCustom } from "src/sections/component/pet/_utils/ApplicationCustom";
import { BackgroundLayer } from "src/sections/component/pet/_layer/bg_layer";
import { PetLayer } from "src/sections/component/pet/_layer/pet_layer";

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
export type optionLayerType = viewportType &
  positionType & {
    zIndex: number;
    zOrder?: number;
    rotation?: number;
  };

  export type optionConfigPet = {
     skin: string;
  speed: number;
  animation: string;
    scale: number;
  }
export type optionPetLayerType = optionLayerType & optionConfigPet;

export type statsType = {
  skin: string;
};
export type renderManagerType = Partial<{
  app: ApplicationCustom;
  resources: resourcesType;
  layer : {
      bgLayer: BackgroundLayer;
    petLayer: PetLayer;
  }

}>;

export type listContainerType = Container[];
