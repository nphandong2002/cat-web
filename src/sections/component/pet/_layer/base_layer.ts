import { Container } from "pixi.js";
import { KeysType, optionLayerType, viewportType } from "src/shared/type/pet-type";
export class BaseLayer {
  container: Container;
  viewport: viewportType;
  key: KeysType[];
  constructor(op: optionLayerType) {
    this.container = new Container();
    this.viewport = {
      height: op.height || 0,
      width: op.width || 0,
    };
    this.container.zIndex = op.zIndex;
    this.container.zOrder = op.zOrder;
    this.container.position.x = op.x || 0;
    this.container.position.y = op.y || 0;
    this.key = [];
  }
  setScale(s: number) {
    this.container.scale.x = s;
    this.container.scale.y = s;
  }
  setPosition(x: number, y: number) {
    this.container.position.x = x;
    this.container.position.y = y;
  }
  addKey(key: KeysType) {
    if (!this.key.some((a) => a == key)) this.key.unshift(key);
  }
  removeKey(key: KeysType) {
    if (this.key.some((a) => a == key))
      this.key.splice(
        this.key.findIndex((a) => a == key),
        1
      );
  }
}
