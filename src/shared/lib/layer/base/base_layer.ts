import { Container } from 'pixi.js';

import { PositionType, ViewPortType } from 'src/shared/type/common-type';
import { ActionServerType, AppearanceLayerType, BaseLayerType, InfoLayerType } from 'src/shared/type/baselayer-type';

export class BaseLayer {
  info: InfoLayerType;
  container: Container;
  viewPort: ViewPortType;
  position: PositionType;
  appearance: AppearanceLayerType;
  constructor(option: BaseLayerType) {
    this.container = new Container();
    this.position = option.position;

    this.info = option.info;
    this.appearance = option.appearance;
    this.viewPort = option.viewPort;
    this.setDefaultData();
  }
  setDefaultData() {
    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.container.zIndex = this.appearance.zIndex;
    this.container.zOrder = this.appearance.zIndex;

    this.container.scale.x = this.appearance.scale;
    this.container.scale.y = this.appearance.scale;
  }
  resize(height: number, width: number) {
    if (this.viewPort.height != height || this.viewPort.width != width) {
      this.viewPort = { height, width };
      this.setPosition(this.position.x, this.position.y, false);
    }
  }
  update() {}
  setPosition(x: number, y: number, save = true) {
    if (save) {
      this.position.x = x;
      this.position.y = y;
    }

    this.container.position.x = this.viewPort.width / 2 - x;
    this.container.position.y = this.viewPort.height / 2 - y;
  }
}
