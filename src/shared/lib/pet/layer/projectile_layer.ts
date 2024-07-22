import { Graphics, Sprite } from 'pixi.js';

import { PorjectileOptionLayer, StatsProjectileType } from 'src/shared/type/pet-type';
import { BaseLayer } from '../../layer/base/base_layer';

export class ProjectileLayer extends BaseLayer {
  stats: StatsProjectileType;
  constructor(option: PorjectileOptionLayer) {
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
    console.log(this.position.x + Math.cos(this.stats.velocity) * this.stats.speed);

    this.setPosition(
      this.position.x + Math.cos(this.stats.velocity) * this.stats.speed,
      this.position.y + Math.sin(this.stats.velocity) * this.stats.speed,
    );
  }
}
