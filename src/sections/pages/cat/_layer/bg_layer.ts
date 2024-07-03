import { Container, Sprite } from 'pixi.js';
import { optionLayerType } from '../cat-type';

export class BackgroundLayer {
  private container: Container;
  constructor(op?: optionLayerType) {
    this.container = new Container();
    const bg = Sprite.from('bg/background.png');
    this.container.zIndex = op?.zIndex || 0;
    this.container.x = op?.x || 0;
    this.container.y = op?.y || 0;

    this.container.addChild(bg);
  }
  getLayer() {
    return this.container;
  }
}
