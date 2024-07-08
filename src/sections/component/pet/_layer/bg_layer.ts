import { Sprite } from 'pixi.js';
import { BaseLayer } from './base_layer';
import { optionBgLayerType, optionLayerType } from 'src/shared/type/pet-type';

export class BackgroundLayer extends BaseLayer {
  constructor(option: optionBgLayerType) {
    super(option);
    const bg = Sprite.from('bg/background.png');
    this.container.addChild(bg);
    this.setScale(option.scale);
  }
}
