import { Container } from "pixi.js";
import { optionLayerType, viewportType } from "../cat-type";
export class BaseLayer {
  container: Container;
  viewport: viewportType;
  constructor(op: optionLayerType) {
    this.container = new Container();
    this.viewport = {
      height: op.height,
      width: op.width,
    };
    this.container.zIndex = op.zIndex;
    this.container.zOrder = op.zOrder;
    this.container.scale.x = op.scale || 1;
    this.container.scale.y = op.scale || 1;
    this.container.position.x = op.x;
    this.container.position.y = op.y;
  }
  setScale(s: number) {
    this.container.scale.x = s;
    this.container.scale.y = s;
  }
  setPosition(x: number, y: number) {
    this.container.position.x = x;
    this.container.position.y = y;
  }
}
