import { ISpineResource } from "@pixi-spine/loader-base";
import { ISkeletonData } from "@pixi-spine/base";
import { ApplicationCustom } from "./_utils/ApplicationCustom";
import { PetLayer } from "./_layer/pet_layer";
import { Container } from "pixi.js";
import { BackgroundLayer } from "./_layer/bg_layer";

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
    scale?: number;
    zIndex: number;
    zOrder?: number;
    rotation?: number;
  };
export type optionPetLayerType = optionLayerType & {
  skin: string;
};
export type statsType = {
  skin: string;
};
export type renderManagerType = Partial<{
  app: ApplicationCustom;
  resources: resourcesType;
  bgLayer: BackgroundLayer;
  petLayer: PetLayer;
  speed: number;
}>;

export type listContainerType = Container[];
