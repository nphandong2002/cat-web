import { Sprite } from 'pixi.js';

import { BackgroundOptionLayer, BaseOptionLayer } from 'src/shared/type/pet-type';

import { BaseLayer } from './base_layer';

export class BackgroundLayer extends BaseLayer {
  constructor(option: BackgroundOptionLayer) {
    super({
      dame: 0,
      speed: 0,
      loyalty: 0,
      attackSpeed: 0,
      name: 'background',
      ...option,
    });
    const bg = Sprite.from('bg/background.png');
    this.container.addChild(bg);
  }
}
