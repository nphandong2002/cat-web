import { ISpineResource } from "@pixi-spine/loader-base";
import { ISkeletonData } from "@pixi-spine/base";
import { ApplicationCustom } from "./_utils/ApplicationCustom";
import { PetLayer } from "./_layer/pet_layer";
import { Container } from "pixi.js";

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
  Partial<positionType> & {
    zIndex?: number;
    scale?: number;
  };
export type statsType = {
  posLeft: number;
  posTop: number;
  animation: string;

  direction: "right" | "left";
  walk: boolean;
  talk: boolean;
  name: string;
  clowderName: String;
  idleType: "idle";
  level: number;
  skin: string;
  eyes: string;
  hat: string;
  glasses: string;
  mask: string;
  wings: string;
  costume: string;
  faceMask: string;
  companion: string;
  rod: string;
  walkType: "BOTTOM" | null;
};
export type renderManagerType = Partial<{
  app: ApplicationCustom;
  resources: resourcesType;
  layer: {
    bg: Container;
    petCurrent: Container;
    pets: listContainerType;
  };
  petLayer: PetLayer;
  speed: number;
}>;

export type listContainerType = Container[];
