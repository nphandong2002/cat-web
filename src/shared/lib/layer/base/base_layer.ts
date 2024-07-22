import { Container } from 'pixi.js';

import { AppearanceType, BaseOptionLayer, InfoType, PositionType } from 'src/shared/type/pet-type';
export class BaseLayer {
  info: InfoType;
  container: Container;
  position: PositionType;
  appearance: AppearanceType;
  mouseXY: PositionType;
  constructor(option: BaseOptionLayer) {
    this.container = new Container();
    this.position = {
      x: option.x,
      y: option.y,
    };
    this.mouseXY = {
      x: 0,
      y: 0,
    };
    this.info = {
      name: option.name,
      loyalty: option.loyalty,
    };

    this.appearance = {
      height: option.height,
      width: option.width,
      zIndex: option.zIndex,
      scale: option.scale,
    };
    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.container.zIndex = this.appearance.zIndex;
    this.container.zOrder = this.appearance.zIndex;
    this.appearance.height && (this.container.height = this.appearance.height);
    this.appearance.width && (this.container.width = this.appearance.width);

    this.container.scale.x = this.appearance.scale || 1;
    this.container.scale.y = this.appearance.scale || 1;
  }
  update() {}
  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.x = y;

    this.container.position.x = this.position.x;
    this.container.position.y = this.position.y;
  }

  setMousePosition(x: number, y: number) {
    this.mouseXY = { x, y };
  }
}
