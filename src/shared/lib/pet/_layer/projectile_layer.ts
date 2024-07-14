import { Graphics, Sprite } from 'pixi.js';

import { optionConfigProjectile, optionProjectileLayerType } from 'src/shared/type/pet-type';
import { BaseLayer } from './base_layer';

export class ProjectileLayer extends BaseLayer {
  stats: optionConfigProjectile;
  constructor(option: optionProjectileLayerType) {
    super(option);
    this.stats = {
      ...option,
    };
    const projectile = typeof option.image == 'string' ? Sprite.from(option.image) : this.getGraphics(option.image);
    this.container.addChild(projectile);
  }
  getGraphics(color: number) {
    const graphics = new Graphics();
    graphics.beginFill(color, 1);
    graphics.drawCircle(0, 0, 50);
    graphics.endFill();
    return graphics;
  }
  update() {
    this.container.position.x += Math.cos(Math.atan2(this.stats.velocity.x, this.stats.velocity.y)) * this.speed;
    this.container.position.y += Math.sin(Math.atan2(this.stats.velocity.x, this.stats.velocity.y)) * this.speed;
    this.stats.decay--;
    this.move();
  }
}
