import { ISpineResource } from "@pixi-spine/loader-base";
import { ISkeletonData } from "@pixi-spine/base";

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
export type optionLayerType = viewportType & {};
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
