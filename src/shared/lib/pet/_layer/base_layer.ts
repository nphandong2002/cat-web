import { Container } from 'pixi.js';

import { moveConfig } from 'src/config/pet-config';
import { BaseOptionLayer, KeysType, PrototypeLayer, StatusType, ViewportType } from 'src/shared/type/pet-type';
export class BaseLayer {
  container: Container;
  key: KeysType[];
  speed: number;
  status: StatusType;
  viewport: ViewportType;
  properties: PrototypeLayer;
  constructor(option: BaseOptionLayer) {
    this.key = [];
    this.properties = {
      name: option.name,
      speed: option.speed,
      dame: option.dame,
      attackSpeed: option.attackSpeed,
    };
    this.viewport = {
      height: option.height,
      width: option.width,
      zIndex: option.zIndex,
      scale: option.scale,
    };
    this.status = [];
    this.speed = option.speed;
    this.container = new Container();
  }
  initContainer() {
    this.container.zIndex = this.viewport.zIndex;
    this.container.scale.x = this.viewport.scale;
    this.container.scale.y = this.viewport.scale;
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
        1,
      );
  }
  update() {
    this.move();
  }
  move() {
    let key = this.key[0];
    if (key && moveConfig[key]) {
      let { x, y } = moveConfig[key];
      x != 0 && (this.container.position.x += x * this.speed);
      y != 0 && (this.container.position.y += y * this.speed);
    }
  }
}
