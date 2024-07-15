import { Graphics, Sprite } from 'pixi.js';

import { BaseLayer } from './base_layer';

export class ProjectileLayer {
  constructor() {}
  getGraphics(color: number) {
    const graphics = new Graphics();
    graphics.beginFill(color, 1);
    graphics.drawCircle(0, 0, 50);
    graphics.endFill();
    return graphics;
  }
  update() {}
}
