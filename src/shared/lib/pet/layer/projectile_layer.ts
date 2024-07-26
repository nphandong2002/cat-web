import { Graphics, Sprite } from "pixi.js";

import { PorjectileOptionLayer, StatsProjectileType } from "src/shared/type/pet-type";
import { BaseLayer } from "../../layer/base/base_layer";

export class ProjectileLayer extends BaseLayer {
  stats: StatsProjectileType;
  constructor(option: PorjectileOptionLayer) {
    super(option);
    this.stats = option.stats;
    const projectile = this.getGraphics(option.visual.image);
    this.container.addChild(projectile);
  }
  getGraphics(color: number) {
    const graphics = new Graphics();
    graphics.beginFill(color, 1);
    graphics.drawCircle(0, 0, 10);
    graphics.endFill();
    return graphics;
  }
}
