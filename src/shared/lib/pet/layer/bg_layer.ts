import { Sprite } from 'pixi.js';

import { moveConfig, zindex } from 'src/config/pet-config';
import { BackgroundOptionLayer } from 'src/shared/type/pet-type';
import { DynamicLayer } from '../../layer/base/dynamic_layer';

export class BackgroundLayer extends DynamicLayer {
  constructor(option: BackgroundOptionLayer) {
    super({
      loyalty: 0,
      name: 'background',
      ...option,
      zIndex: zindex.bg,
    });
    const bg = Sprite.from('bg/background.png');
    this.container.addChild(bg);
    this.setPosition();
    console.log(bg.texture.height, bg.texture.width);
  }
  resize(width: number, height: number) {
    if (width != this.appearance.width || height != this.appearance.height) {
      this.appearance.width = width;
      this.appearance.height = height;
      this.setPosition();
    }
  }
  setPosition() {
    this.appearance.width && (this.container.x = this.appearance.width / 2 - this.position.x);
    this.appearance.height && (this.container.y = this.appearance.height / 2 - this.position.y);
  }
  move() {
    let key = this.key[0];
    if (key && moveConfig[key]) {
      let { x, y } = moveConfig[key];
      x != 0 && (this.position.x += x * this.stats.speed);
      y != 0 && (this.position.y += y * this.stats.speed);
      this.setPosition();
    }
  }
}
