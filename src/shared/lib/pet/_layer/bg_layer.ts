import { Sprite } from 'pixi.js';

import { BaseOptionLayer } from 'src/shared/type/pet-type';

import { BaseLayer } from './base_layer';

export class BackgroundLayer extends BaseLayer {
  constructor(option: BaseOptionLayer) {
    super(option);
    const bg = Sprite.from('bg/background.png');
    this.container.addChild(bg);
    this.setScale(option.scale);
  }
}
