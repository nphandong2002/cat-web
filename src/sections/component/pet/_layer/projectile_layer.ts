import { Graphics, Sprite } from 'pixi.js';

import { optionProjectileLayerType } from 'src/shared/type/pet-type';
import { BaseLayer } from './base_layer';

export class ProjectileLayer extends BaseLayer {
  color: number;
  constructor(option: optionProjectileLayerType) {
    super(option);
    this.color = [0x89abcd, 0xffbd01][Math.floor(Math.random() * 5)];
    const graphics = new Graphics();
    graphics.lineStyle(10, this.color, 1);
    graphics.beginFill(0xc34288, 1);
    graphics.drawCircle(0, 0, 50);
    graphics.endFill();
    const projectile = option.image ? Sprite.from(option.image) : graphics;
    this.container.addChild(projectile);
  }
}
